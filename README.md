# Google-Classroom-Apps-Script-Summary-Tool-using-Google-Sheets 

based on git template Classroom-to-Sheets - Integrate classroom details on Google Sheets ✅

The program is completely written from scratch.

```
    This script will have to run with the project owner as the person with the google classroom information.
    OR
    If you deploy it as a web app and run as the user option is selected and the user accepts the permissions then anyone can use it.

    See https://vanburen.brooklyncoop.org/google-classroom-history for an example of a deployed running application.

    The only thing that should be changed is the SHARE_EMAIL constant and you can set it to a parent's email address and anyone one's email address.

    Also this makes an assumption that homework is what we want to focus on.
    It also assumes that homework has "hw" or "homework" etc. in the title or it is due early in the morning.

    It is sad but true that google classroom or may be the administratiors do not clearly distinguish homework from classwork.

    Enjoy and feel free to modify, like, comment and subscribe!!!

    As always, we look forward to see what you can build!!!

const SHARE_EMAIL="PARENT-OR-OTHER-EMAIL-HERE"; // e.g., "parent@gmail.com"
```

## 💡Inspiration
* 📚 Our son using google classroom and we want to help organize the home projects.

* 🎓 Still, we need to add upcoming assignments and certain class details manually.

***

## ⚙️ What it does do?
```
    This script will have to run with the project owner as the person with the google classroom information.
    OR
    If you deploy it as a web app and run as the user option is selected and the user accepts the permissions then anyone can use it.

    See https://vanburen.brooklyncoop.org/google-classroom-history for an example of a deployed running application.

    The only thing that should be changed is the SHARE_EMAIL constant and you can set it to a parent's email address and anyone one's email address.

    Also this makes an assumption that homework is what we want to focus on.
    It also assumes that homework has "hw" or "homework" etc. in the title or it is due early in the morning.

    It is sad but true that google classroom or may be the administratiors do not clearly distinguish homework from classwork.

    Enjoy and feel free to modify, like, comment and subscribe!!!

    As always, we look forward to see what you can build!!!

const SHARE_EMAIL="PARENT-OR-OTHER-EMAIL-HERE"; // e.g., "parent@gmail.com"
```

### Features: 



***
## How we built it 👩‍💻

It is built using the:

<img src="https://user-images.githubusercontent.com/56017960/155880704-54f1457c-1ba0-4a4f-bda9-36a5f4fe495f.svg" width="50px"> **Google Classroom API**  <br>
<img src="https://user-images.githubusercontent.com/56017960/155880720-5cd1f447-7f65-4bf5-b4ed-7fc0e6b347bb.png" width="50px"> **Google Spreadsheet API** <br>
<img src="https://user-images.githubusercontent.com/56017960/155880750-ee776ace-26b4-49cc-9bc6-8ecdf4065b79.png" width="50px"> **Google App Scripts** <br>


***

## Setting Up the Project

* Create a New Google Sheet
* In the Extensions Menu -> Select App Scripts
 ![image](https://user-images.githubusercontent.com/56017960/155875292-14b2f340-4efb-4c1d-a30e-721b4cfe41d2.png)
* App Scripts connected to the sheet will open up. Clear all the prewritten code and insert the following [code](https://gist.github.com/savi-1311/6838d1e3eb879208a7f9c44b428e8cf1) into it.
* Click on Services on the left pane to add the Google Classroom API service.
 ![image](https://user-images.githubusercontent.com/56017960/155875549-95c7b947-300c-4923-bbf9-afbe1706bb4d.png)
* Save the script by clicking on Ctrl+S.
* Reload the Google Sheets. You will now find a new Custom Menu. If not, try to open the script once again.
 ![image](https://user-images.githubusercontent.com/56017960/155875441-211cb34e-d09d-40a2-abcf-476b5b045e8b.png)
* Run a task. For the first time, you will be asked for authorization. Provide all of them.
* All the Details will be displayed with a single click!

***

## 🚀 Use of Google Cloud
* I used Google Cloud Classroom API, Google Spreadsheet API, and Google App Scripts to integrate the services and create this Hack!

## 🚀 Use of GitHub
* To host my repository ofcourse :)

***

## Challenges I ran into 🙁


***

## Accomplishments that I'm proud of 😇


***

## What I learned 🤔


***

## What's next for 
# Google-Classroom-Apps-Script-Summary-Tool-using-Google-Sheets 



***
