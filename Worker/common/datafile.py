from pathlib import Path


doneIndicator = "###DONE###"


def mark_data_file_complete(writer):
    writer.writerow([doneIndicator])


def is_data_file_complete(file_path):
    if not Path(file_path).is_file():
        return False
    content = Path(file_path).read_text()
    return content.endswith(doneIndicator + "\n")
