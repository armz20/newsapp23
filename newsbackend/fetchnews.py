from airflow import DAG
from airflow.operators.python_operator import PythonOperator
import pandas as pd
from datetime import datetime, timedelta
import requests
from io import StringIO
import boto3


API_KEY = "8bad87c71981425da0e21393fde12aa9"
ACCESS_KEY = "AKIAVPACHZEK2PIXBBSI"
SECRET_ACCESS_KEY = "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"
BUCKET_NAME = "newsfetch"

NO_SOURCES = 2

CURRENT_DATE = datetime.now().date()
FETCH_FROM_DATE = CURRENT_DATE - timedelta(days=10)

def fetch_data(resource= str, source= str, from_date=FETCH_FROM_DATE):

    base_url = "http://newsapi.org/v2"
        
endpoint_url = f" {base_url}/{resource}?apiKey={API_KEY} "
            
        if resource == "everything":
        
endpoint_url = (f"{endpoint_url}&q=any&from={from_date}&sources={source}&sortBy=publishedAt")

    return requests.get(endpoint_url).json()

class ExtractData:
    def __call__(self, **context) -> str:
        """
             function extracts the top-headlines for all the sources of the NEWS API. represented by a key word 
        """
        sources_df = pd.DataFrame(fetch_data("sources", "all")["sources"])
        allsources = sources_df["id"].tolist()
        headlines_df = pd.DataFrame()
        for source in allsources[:NO_SOURCES]:
            
            "creating a keyword for head articles and returning errors for wrong keywords input "
            keyword_df = pd.DataFrame(fetch_data("everything", source)["articles"])

            if keyword_df.empty or len(keyword_df) == 0:

                raise ValueError("KEY error ")

            try:
                keyword_df["source"] = keyword_df["source"].apply(lambda x: x["id"])
            except ValueError:
                print("invalid source")

            keyword_df.insert(0, "key", source)
            headlines_df = headlines_df.append(
                keyword_df[["source", "title", "description", "key"]]
            )

        return headlines_df, allsources


class TransformData:
    def __call__(self, **context) -> str:
        """
            This function transforms the top-headlines dataframe from the previous task
            and produces a CSV buffer .
         """
        # headlines.tasl("last keywords"/)

        headlines_df, sources = context["task_instance"].xcom_pull(
            task_ids="extract_data"
        )
        csv_buffer = StringIO()
        return csv_buffer, sources, headlines_df


class LoadData:
    def __call__(self, **context) -> str:
        """
            writing keyword data into s3 
        """

        csv_buffer, sources, headlines_df = context["task_instance"].xcom_pull(
            task_ids="transform_data"
        )

        for source in sources:

            keyword_df = headlines_df[headlines_df["key"] == source]
            csv_buffer = StringIO()
            keyword_df.to_csv(csv_buffer, index=False)
            file_name = (
                f"/{str(source)}/{datetime.now().date()}_{source}_top_headlines.csv"
            )
            try:
                s3_resource = boto3.resource(
                    "s3",
                    aws_access_key_id=ACCESS_KEY = "AKIAVPACHZEK2PIXBBSI",
                    aws_secret_access_key="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",
                )

                s3_resource.Object(newsfetch, file_name).put(
                    Body=csv_buffer.getvalue()
                )
                print(f"FileName Uploaded is {file_name}")

            except RuntimeError:
                print(
                    "The AWS IAM credentials error"
                )

        return "passed "


"""
 DAG Processes.
"""

default_args = {
    "owner": "airflow",
    "depends_on_past": False,
    "email": ["airflow@airflow.com"],
    "email_on_failure": False,
    "email_on_retry": False,
    "retries": 0,
    "retry_delay": timedelta(minutes=2),
}

# DAG Object
dag = DAG(
    "tempus_challenge_dag",
    default_args=default_args,
    schedule_interval="@daily",
    catchup=False,
)

extract_data = PythonOperator(
    task_id="extract_data",
    provide_context=True,
    python_callable=ExtractData(),
    dag=dag,
)

transform_data = PythonOperator(
    task_id="transform_data",
    provide_context=True,
    python_callable=TransformData(),
    dag=dag,
)

load_data = PythonOperator(
    task_id="load_data", provide_context=True, python_callable=LoadData(), dag=dag,
)

extract_data >> transform_data >> load_data