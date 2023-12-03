## <img src="/public/CattailLogo.png" alt="image" width="4%" height="auto" > Cattail Overview: 



Cattail is a lightweight platform that allows freelance designers/artists to streamline their projects. Clients can fill out an intake form which is then sent to the artist as a request. Artists have the option to view the request in detail and then decide if they want to accept it, refer it to another artist or decline it all together. If they choose to accept it, they can track and manage this task in a project page, which includes a Kanban Board, Moodboard and a place to store relevant files. They can also chat with the client to clarify any concerns they have. This platform makes projects requests extremely easy, and combines the functionality of the multiple tools that freelancers currently use into one platform, making the designing process of an artist much easier. 

Cattail was ideated and launched during LavaLab's Fall 2023 Cohort by John Murnen, Elissa Martial, Aman Kumar and Mantej Lamba. LavaLab is USC's premier student-run product incubator, dedicated to fostering innovation and entrepreneurship. 

This GitHub Repo holds the code for the MVP (minimum viable product) that was presented during Demo Day. It was developed using React, Next.js, Tailwind, Firebase and deployed on [vercel](https://cattail.vercel.app/). 

In the MVP, users can visit the homepage to fill out an intake form, that is sent to an artist (Elissa's) account, as a request. To see the artist's point of view, users can go to [cattail.vercel.app/requests](https://cattail.vercel.app/requests), which holds the list of requests that Elissa currently has. They can then choose one of the options (accept, refer, decline) on the request card. If the request is accepted, a new Project is created, populated with the images shared in the request. Users can add tasks to the Kanban Board, drag them to different columns, and delete them. They are also able to upload files and images, to the File Upload section and the Moodboard. All of this information is stored in the backend (Firebase DB) for each project. Users can also delete the project by clicking on the trash icon on the top right. 

The next step is to complete the Dashboard page to show all the current tasks and files across all the projects, and implement a fully-functioning timeline. 
