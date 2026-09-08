async function send(){
    const user = document.getElementById("username").value.trim();
    const mail = document.getElementById("mail").value.trim();
    const msg = document.getElementById("feedback").value.trim();

    if(user == "" || mail == "" || msg == ""){
        alert("Please fill all the fields...");
        return;
    }

    const name_pattern = /^[A-Za-z ]+$/;

    if(!name_pattern.test(user)){
        alert("Please enter a valid user name...");
        return;
    }

    const mail_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!mail_pattern.test(mail)){
        alert("please enter a valid mail address...");
        return;
    }


    const msg_data = await fetch("/contact",
        {
            method:"POST",
            headers:{"Content-Type":"Application/json"},
            body: JSON.stringify({
                name:user,
                mailid:mail,
                message:msg
            })
        });
        const data = await msg_data.json();

    alert("Feedback message successfully submited.")
}