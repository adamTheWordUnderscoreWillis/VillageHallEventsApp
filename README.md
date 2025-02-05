# Little Tidford Village Hall App


The Little Tidford Village Hall App is a noticeboard for the quaint and completely fictional village of Little Tidford. You can check it out here:

**[LITTLE TITFORD VILLAGE HALL APP](https://little-tidford-village-hall.vercel.app/)**

or watch me clumsily explain how it works here:

**[YOUTUBE](https://www.youtube.com/watch?v=fYwZ8EtY4g4)**

## User Experience
### Client
The app is rednered as a 3D noticeboard with colourful flyers on it that users can browse. Users login with their google account ad then they can sign up to events and put events in their google calendars.

### Staff
Staff members can create new events as well as see who will be attending events and delete events as well.

## Teckstack
This is a MERN stack app. The front-end is built with React and React-Three-Fiber (for the 3D) and it uses an express server to access a MongoDB database.

## Running the project yourself

### Cloning the repo
1 Open your CLI and navigate to the folder you wish to store this project in.

2. Once you've found a home for my precious baby paste the follwong command in and press enter:
     
     > git clone https://github.com/adamTheWordUnderscoreWillis/VillageHallEventsApp.git

3. Once you've made the clone. Open the directory in a whatever IDE you like.

### Setup

#### Dependencies

4. You should see two folders one called 'client' and one called 'server'. You need to change directory into the server folder 
>cd server

and you need to to install the packages listed in the package.jsonby running this command in the CLI

>npm install

5. Do the exact same thing with the client folder

**Good job**
#### Database setup
6.The database uses environment variables. If you intend to run the project locally you will need a .env file in the root of both you r client and server folders.
> .env

written like that.

In your server folders .env file you are going to need three variables:

>MONGODB_URI= this is a url that you will get from mongodb later on.

>STAFF_MEMBER=To protect the digression of our staff I put this into the evironment, however it is used in the testing suite. It is an email found in the staff database.

> PORT=the port you want your local host to run on, from the index.js file (e,g PORT=5050)


In your Client .env:

>VITE_BACKEND_URL= This is how the front end finds the back end. When local it will be http://localhost::[your port number] It is imoportant that you do not remove VITE from the name, as that is how VITE finds in the front end apparently. 

#### MongoURI and Staff member

7. Head to MongoDB atlas and login:

**[MONGODB LOGIN](https://account.mongodb.com/account/login)**

Here are the test account details:

Email:
>littletidfordvillagehallapp@gmail.com

Password:
>3kHJTMgNnb5hV

8. Once logged in navigate to the project 0 overview and you should see 'LittleTidfordVilageHallApp' listed in the clusters. You need to click connect.

9. this should open up a a variety of ways to connect, click on drivers. Then you want to toggle off the full code snippet and just copy that connection string into your MONGODB_URI variable in you .env files (remembering to change \<password\> to be the pasword listed above).

10. Next click on clusters and browse the collections. You will see 'development' and 'test' those are our databases (guess what they're for). In both of those databases thre is a collection called staff. In there you will find the staff member to put in you STAFFMEMBER environment variable... Or you can manually add a staff member you want to use, following the same schema.

#### Starting the server

11. Set your port variable to whatever you want mine was 5050. And then set the VITE_BACKEND_URL environment variable to go to that local host port.

12. To run the server change directory into the server and run

>npm run start

You should get two console log saying
~~~
Pinged your deployment. You successfully connected to MongoDB!

Server is listening on [YOUR PORT NUMBER]
~~~

13. At this point you could test the endpoints in app.js on postman, insomnia or in the browser. If you have errors, it may be worth checking the MONGODB URI. I found it quite finickety.

#### google cloud console
15. Please log in to google cloud console with the same password and email as above:

**[GOOGLE CLOUD CONSOLE](https://accounts.google.com/InteractiveLogin)**

16. In google cloud console click the burger menu and go to apis & services and then head to the Oauth consent screen

17. Yes! you would like the new experience (When it offers you a pop up - if it doesn't it's in google Auth platform)

18. Click on clients, in clients add the you local host frontend URL (the project by default is set to http://localhost::5173) to the authorized javascript origins section as well as any domains you intend to host this app on.

19. The app is waiting on verification. if it passes then anyone will be able to access the google api... however, if you want to add a test email go to the audience section and simply set it back to testing and add the email you want to test it with (The email listed above is registered in the test account so if you log in with that email you will get all the google api features).

20. back in the project. You are now ready to run the front-end! change directory to the client folder and run the command 
>npm run dev

and ctrl click the link in the CLI.

**Gaze upon it's beauty**

**...mmm**

21. Once you have finished fiddling with it, make sure you put a file called
>.gitignore

in the root of the project and write .env in there so that you don't share any of my ~~publiclly accessible~~ secrets.

### Testing
To test the endpoints change directory to server and run this command:
>npm test

It will connect you to the test database in mongo db and it reseeds itself all by itself before each test.

### Minimum requirements
The project was built using the following versions of packages. It is reccomended that these are the minimum versions.

- Node. js Version 20.16.0
- mongoDB Version 6.12.0
- Express Version 4.21.2
- React Version 18.3.1

## A bit of fun
Please leave an amusing event on the events board if you manage to gain staff access. I will check it and it'll make my day.

And please message me on github if you have any issues seting up.

Good luck.









