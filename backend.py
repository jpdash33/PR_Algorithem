from flask import Flask,render_template,request,jsonify
from datetime import datetime
import sqlite3

date = datetime.now().date()

conn = sqlite3.connect("FeedbackMSG.db")
cursor = conn.cursor()

conn.execute( """
CREATE TABLE IF NOT EXISTS MSG (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    date TEXT NOT NULL
)""")

conn.commit()
conn.close()

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/contact", methods=["GET", "POST"])
def contact():

    if request.method == "POST":
        message = request.json

        username = message["name"]
        mail = message["mailid"]
        msg = message["message"]

        date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            
        try:
            conn = sqlite3.connect("FeedbackMSG.db")
            cursor = conn.cursor()

            cursor.execute(
                "INSERT INTO MSG (name, email, message, date) VALUES (?, ?, ?, ?)",
                (username, mail, msg, date)
            )

            conn.commit()
            conn.close()

            return jsonify({"Status code": "success"})

        except Exception as e:
            print(e)
            return jsonify({"Status code": "error", "message": str(e)}), 500


    return render_template("contact.html")


if __name__ == "__main__":
    app.run(debug=True)