// version 1.0.0
/*
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
*/
const SHARE_EMAIL="PARENT-OR-OTHER-EMAIL-HERE"; // e.g., "parent@gmail.com"

const DAYS_TO_LOOK_BACK = 10;
let PARM_DAYS_TO_LOOK_BACK = DAYS_TO_LOOK_BACK;

const COURSE_DAYS_TO_LOOK_BACK = 300;
let PARM_COURSE_DAYS_TO_LOOK_BACK = COURSE_DAYS_TO_LOOK_BACK;
const GETCLASSROOM = "doGetClassroom";

function test1() {
  let e = {};
  e.parameters = {};
  doGet(e);
}

function cleanupTriggers(){
  const triggers = ScriptApp.getProjectTriggers();
  Logger.log(`QQQ: trigger0: ${JSON.stringify(triggers)}`);
  for (const i in triggers) {
    const funcName = triggers[i].getHandlerFunction();

    Logger.log(`QQQ: trigger: ${funcName} ${JSON.stringify(triggers[i])}`);
    if ( funcName === GETCLASSROOM ){
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}

function testtimesince() {
  const updateTime = "2023-08-18T05:42:12.391Z";
  Logger.log(`Time Since ${timeSince(new Date(updateTime))}`);
}
function testdayssince() {
  const updateTime = "2023-08-18T05:42:12.391Z";
  Logger.log(`Days Since ${daysSince(new Date(updateTime))}`);
}

function doPost(e){
  return doGet(e);
}

function doGet(e) {
  let sh
  let url
  let ss;
  Logger.log(`DEBUG: ${JSON.stringify(e)}`);
  if (!e || !e.parameters || !e.parameters.type) {
    e = {};
    e.parameters = {};
    e.parameters.type= "getsheet";
    e.parameters.lookback = PARM_DAYS_TO_LOOK_BACK;
    e.parameters.courselookback = PARM_COURSE_DAYS_TO_LOOK_BACK;
  }
  
  // it is not clear how deployments are updated?  It appears you can only create new versions.
  const deploymenturl = "https://script.google.com/a/macros/sascholar.org/s/AKfycbyua5Yi7riKQG8prb9HOvAivg9VJVHG1_TK2Lz--q_WgvTfDafgRQmwLOCG12VFVW8HOQ/exec"


  const email = Session.getActiveUser().getEmail();
  const now = new Date();
  const type1 = String(e.parameters.type ? e.parameters.type : "getsheet")

  PARM_DAYS_TO_LOOK_BACK = e.parameters.lookback ? parseInt(e.parameters.lookback) : PARM_DAYS_TO_LOOK_BACK;

  PARM_COURSE_DAYS_TO_LOOK_BACK = e.parameters.courselookback ? parseInt(e.parameters.courselookback) : PARM_COURSE_DAYS_TO_LOOK_BACK;

  Logger.log(`QQQ: >>${type1}<< ${typeof type1}`)

  switch (type1) {
    case 'getform':
      {
        const htmlOutput = HtmlService.createHtmlOutput(`<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,minimum-scale=1"></head><body><p>This will organize your Google Classroom information.  The history will append to the sheet and you can use Google Sheet filtering and sorting, etc.</p> <p>The process takes a few minutes to complete.</p> <p><form action="/"><input id="type" name="type" hidden value="getsheets"></form></p> <p><b>See <a target="_blank" href="https://drive.google.com/drive/u/0/recent">XRecent Google Drive sheets</a></b></p></body></html>`);
        htmlOutput.addMetaTag('viewport', 'width=device-width, initial-scale=1');
        return htmlOutput;
      }
      break;
    case 'getproperties':
      const properties = PropertiesService.getUserProperties().getProperties();
      for (item in properties) {
        Logger.log(`QQQ: item: ${item} details: ${properties[item]}`);
      }
      break;
    case 'getsheet':
      Logger.log(`QQQ running getsheet`)
      /*
      try {
        ss = SpreadsheetApp.create(`Classroom History - ${email} - ${now}`);

        sh = ss.getActiveSheet()
        url = ss.getUrl();
      } catch (err) {
        // TODO (developer) - Handle exception
        Logger.log('Failed with error %s', err.message);
      }
      sh.appendRow(['coursename', 'title', 'alternateLink', 'duedate', 'duedatelocal', 'state.state', 'state.length', 'grade', 'coursework.updateTime', 'coursework.creationTime', 'submission.updateTime', 'submission.creationTime', 'coursework.id', 'submission.id', 'JSON.stringify(c)', 'JSON.stringify(submission)'])
      */
      const lock = LockService.getUserLock();
      lock.waitLock(30000);
      const trigger = ScriptApp.newTrigger("doGetClassroom")
        .timeBased()
        .at(new Date((new Date()).getTime() + 1000 * 2 * 1))
        .create();
      const triggerUid = trigger.getUniqueId()
      const triggerData = {  now: now, email: email, lookback: PARM_DAYS_TO_LOOK_BACK, courselookback: PARM_COURSE_DAYS_TO_LOOK_BACK };
      PropertiesService.getUserProperties().setProperty(triggerUid, JSON.stringify(triggerData));
      doGetClassroom(undefined, triggerData);
      lock.releaseLock();
      const htmlOutput = HtmlService.createHtmlOutput(`<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,minimum-scale=1"></head><body><p>This will organize your Google Classroom information.  The history will append to the sheet and you can use Google Sheet filtering and sorting, etc.</p> <p>The process takes a few minutes to start appending to the sheet.</p> <p><b>An email will be sent to the owner of the project when complete.</b></p></body></html>`);
      htmlOutput.addMetaTag('viewport', 'width=device-width, initial-scale=1');
      return htmlOutput;
      break;

    default:

      Logger.log(`QQQ running default`)
      return HtmlService.createHtmlOutput(`<p>This will organize your Google Classroom information.  The history will append to the sheet and you can use Google Sheet filtering and sorting, etc.</p> <p>The process takes a few minutes to start appending to the sheet.</p><p><b><a href="${deploymenturl}?type=getsheet">Click to start process</a></b></p>`);
      break;

  }

}

function doGetClassroom(event, newparm) {
  Logger.log(`QQQ: starting doGetClassroom`);

  const lock = LockService.getUserLock();

  try {
    lock.waitLock(30000); // wait 30 seconds for others' use of the code section and lock to stop and then proceed
  } catch (e) {
    Logger.log('Could not obtain lock after 30 seconds.');
    // return HtmlService.createHtmlOutput("<b> Server Busy please try after some time <p>")
    // In case this a server side code called asynchronously you return a error code and display the appropriate message on the client side

    return "Error: Server busy try again later... Sorry :("
  }
  let properties = undefined;
  try {
    Logger.log(event.triggerUid);
    Logger.log(`QQQ: TriggerUid: ${PropertiesService.getUserProperties().getProperty(event.triggerUid)}`)

    properties = JSON.parse(PropertiesService.getUserProperties().getProperty(event.triggerUid));
  } catch (e) {
    Logger.log(`QQQ OLD TRIGGER WAY ISSUE`);

  }
  if (newparm) {
    properties = newparm;
  }

  lock.releaseLock();
  /*
  var triggers = ScriptApp.getProjectTriggers();
  for (const i in triggers) {
    const funcName = triggers[i].getHandlerFunction();

    Logger.log(`QQQ: trigger: ${funcName} ${JSON.stringify(triggers[i])}`);
    // Clean up previous triggers
    ScriptApp.deleteTrigger(triggers[i]);
  }
  */
  cleanupTriggers();
  
  const spreadsheetid = properties.spreadsheetid;
  const PARM_DAYS_TO_LOOK_BACK = properties.lookback;
  const email=properties.email;
  const now=properties.now;
  // const spreadsheet=JSON.parse(properties.spreadsheet);
  Logger.log(`QQQ: coursework lookback: ${PARM_DAYS_TO_LOOK_BACK}`);

  const PARM_COURSE_DAYS_TO_LOOK_BACK = properties.courselookback;
  Logger.log(`QQQ: course lookback: ${PARM_COURSE_DAYS_TO_LOOK_BACK}`);

  // const ss = SpreadsheetApp.openById(spreadsheetid)
  // const ss=spreadsheet;
  let ss;
  let sh;
        try {
        ss = SpreadsheetApp.create(`Classroom History - ${email} - ${now}`);

        sh = ss.getActiveSheet();
        url = ss.getUrl();
      } catch (err) {
        // TODO (developer) - Handle exception
        Logger.log('Failed with error %s', err.message);
      }
      sh.appendRow(['coursename', 'title', 'alternateLink', 'duedate', 'duedatelocal', 'state.state', 'state.length', 'grade', 'coursework.updateTime', 'coursework.creationTime', 'submission.updateTime', 'submission.creationTime', 'coursework.id', 'submission.id', 'JSON.stringify(c)', 'JSON.stringify(submission)'])
  const spreadsheet=ss;
  //const sh = ss.getActiveSheet();
  /*
  if(e.parameters){
    const id = e.parameters.id || 0
    
    //Logger.log(`QQQ student submissions: ${Classroom.Courses.CourseWork.StudentSubmissions.list(list(id)}`)
  }*/

  // GET ALL COURSES
  var nextPageToken = "";

  //and now we'll loop arround retrieving a batch of results, 
  //writing them to the spreadsheet and then getting the next batch etc.
  do {
    //get list of course details
    var optionalArgs = {
      pageSize: 1000,
      courseStates: ['ACTIVE'],
      pageToken: nextPageToken
    };
    var response = Classroom.Courses.list(optionalArgs);
    var nextPageToken = response.nextPageToken;
    //var response = Classroom.Courses.list();
    var courses = response.courses;
    Logger.log(`QQQ: courses: ${courses}`)
    if (!courses) {
      Logger.log(`QQQ: NO COURSES`);
      continue;
    }
    for (i = 0; i < courses.length; i++) {
      var course = courses[i];
      Logger.log(`QQQ: course: ${course}`)
      Logger.log(`Course time since ${timeSince(new Date(course.creationTime))}`);
      const days = daysSince(new Date(course.creationTime));
      if (days > PARM_COURSE_DAYS_TO_LOOK_BACK) {
        Logger.log(`Skipping OLD Course Created: ${days} days ago`);
        continue;
      }
      const coursename = courses[i].name
      const id = course.id
      // ALL COURSE WORK
      const class1 = Classroom.Courses.CourseWork.list(id)
      const w = class1.courseWork
      Logger.log(`QQQ: class1: ${class1}`)

      if (w) {
        for (k = 0; k < w.length; k++) {
          const c = w[k]
          const processcourse1 = processcourse(c)
          // GET ALL COURSE WORK STUDENT SUBMISSION
          const submission = Classroom.Courses.CourseWork.StudentSubmissions.list(course.id, c.id)

          const state = processstate(submission);
          Logger.log(`Coursework time since ${timeSince(new Date(state.updateTime))}`);
          const days2 = daysSince(new Date(state.updateTime));
          if (days2 > PARM_DAYS_TO_LOOK_BACK) {

            Logger.log(`Skipping OLD CourseWork Updated: ${days2} days ago`);
            continue;
          }
          // highlight homework.  guessing the name will have home in it.
          if (
            (processcourse1.title && (processcourse1.title.match(/home/i) || processcourse1.title.match(/hw/i)))
            || (processcourse1.date && processcourse1.date.getHours() == 7)) {
            processcourse1.title = `>>>${processcourse1.title}`;
          }
          sh.appendRow([coursename, processcourse1.title, processcourse1.alternateLink, processcourse1.date, processcourse1.datelocal, state.state, state.length, (state.assignedGrade ? (state.assignedGrade + '/') : 'not-graded-yet/') + processcourse1.maxPoints, processcourse1.updateTime, processcourse1.creationTime, state.updateTime, state.creationTime, processcourse1.id, state.id, JSON.stringify(c), JSON.stringify(submission)])
          //Logger.log(`QQQ student submissions: ${Classroom.Courses.CourseWork.StudentSubmissions.list(course.id,c.id)}`)

          //sh.appendRow(['submission', JSON.stringify(submission)])
        }
      }
    }
  } while (nextPageToken != undefined);

  // format the output sheet
  sh.getRange(1, 1, sh.getMaxRows(), sh.getMaxColumns()).activate();
  ss.getActiveRange().offset(1, 0, ss.getActiveRange().getNumRows() - 1).sort({ column: 4, ascending: false })
  //ss.getRange('A1:Z1600').activate();
  //var banding = ss.getRange('A1:Z1600').getBandings()[0];
  /*banding.setHeaderRowColor('#f46524')
  .setFirstRowColor('#ffffff')
  .setSecondRowColor('#ffe6dd')
  .setFooterRowColor(null);
  */
  const filter = sh.getRange(1, 1, sh.getMaxRows(), sh.getMaxColumns()).createFilter();
  const Filter_Criteria1 = SpreadsheetApp.newFilterCriteria().whenTextStartsWith('>');
  const add_filter1 = filter.setColumnFilterCriteria(2, Filter_Criteria1);
  
  GmailApp.sendEmail(SHARE_EMAIL,`Classroom History - ${email} - ${now}`,`History is updated. See ${ss.getUrl()}`);
  GmailApp.sendEmail(Session.getEffectiveUser().getEmail(),`Classroom History - ${email} - ${now}`,`History is updated. See ${ss.getUrl()}`);

  // Share this file to the editor
  // DriveApp.getFileById(spreadsheetid).addEditor(SHARE_EMAIL);
  spreadsheet.addEditor(SHARE_EMAIL);
}

function processstate(submission) {
  let state
  let return_length = 0
  let assignedGrade
  let creationTime
  let updateTime
  let id
  if (submission) {
    if (submission['studentSubmissions']) {
      return_length = submission['studentSubmissions'].length
      if (submission['studentSubmissions'].length > 0) {
        state = submission['studentSubmissions'][0]['state']
        assignedGrade = submission['studentSubmissions'][0]['assignedGrade']
        updateTime = submission['studentSubmissions'][0]['updateTime']
        creationTime = submission['studentSubmissions'][0]['creationTime']
        id = submission['studentSubmissions'][0]['id']
      }

      //state=submission['state']
    }
  }
  return { state: state, length: return_length, assignedGrade: assignedGrade, updateTime: updateTime, creationTime: creationTime, id: id }
}


function processcourse(c) {
  const due = c.dueDate
  const duetime = c.dueTime
  let date


  if (due) {
    const year = due['year'] || 0
    const month = (due['month'] || 0) - 1
    const day = due['day'] || 0
    let hour = 0
    let minute = 0
    if (duetime) {

      hour = duetime['hours'] || 0
      minute = duetime['minutes'] || 0
    }

    date = new Date(Date.UTC(year, month, day, hour, minute))
    Logger.log(`QQQ day ${date}`)

    console.log(`localtime ${date.toLocaleString()}`);

  }
  const datelocal = date ? date.toLocaleString() : date
  return { date: date, datelocal: datelocal, alternateLink: c.alternateLink, title: c.title, maxPoints: c.maxPoints, creationTime: c.creationTime, updateTime: c.updateTime, id: c.id }
}


function daysSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000);

  interval = seconds / 86400;

  return Math.floor(interval);
}

function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}
