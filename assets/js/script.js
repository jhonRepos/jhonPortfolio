


function scrollToview(select, event) {
    event.preventDefault();
    var section = document.getElementById(select);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        document.getElementById("nav-overlay").style.width = "0%";
    }
}
   

   
   
// HERO SECTION


$('.burger-menu').on('click', function() {

    document.getElementById("nav-overlay").style.width = "100%";

  });
$('.closebtn').on('click', function() {
document.getElementById("nav-overlay").style.width = "0%";

});


let text= document.getElementById('text');

let php= document.getElementById('php');
let js= document.getElementById('js');
let greater= document.getElementById('greater');
let css= document.getElementById('css');
let brocket= document.getElementById('brocket');
let paren= document.getElementById('paren');
let person= document.getElementById('person');
let sql= document.getElementById('sql');

window.addEventListener('scroll', ()=>{
    let value = window.scrollY;

    text.style.marginTop =value * 2.5 + 'px';
    person.style.left =value * -1.5 + 'px';

    css.style.marginBottom =value * 1.5 + 'px';
    css.style.left =value * 1.5 + 'px';
    brocket.style.left =value * 1.5 + 'px';
    brocket.style.marginBottom =value * -1.5 + 'px';
    sql.style.left =value * 1.5 + 'px';
    php.style.marginBottom =value * 1.5 + 'px';


    paren.style.left =value * -1.5 + 'px';
    js.style.left =value * -1.5 + 'px';

    
    document.querySelectorAll('.section').forEach(function(section) {
        let offset = section.offsetTop;
        let distance = offset - value;
        let speed = section.getAttribute('data-speed');

        section.style.backgroundPositionY = -(distance * speed) + 'px';
    });
})


// PROJECT SECTION

const objectiveList=[
    {
        image:'hris-laptop.png',
        title:'HRIS (Human Resource Information System)',
        role:'Fullstack Developer',
        objective:[
            "Enhance efficiency and accuracy in HR operations through streamlined data management processes.",
            "Support organizational growth and scalability by implementing customizable workflows and scalability features within the HRIS platform.",
            "Employees can easily request overtime, leave, or schedule changes, manage timekeeping, and access their payslips.",
            "To streamline payroll generation within the HR and payroll management system.",
         ],
        responsibilities:[
            "Develop front-end website architecture.",
            "Design user interaction on web pages.",
            "Develop back-end website application.",
            "Design and implement database structures.",
            "Optimize database queries for efficiency and performance.",
            "Define endpoints and data formats for communication between different parts of the application.",
            "Work alongside graphic designer for web design features.",
            "Ensure cross-platform optimization."
          ],
        techstack:['Codeigniter','Mysql','Html','Css','Bootstrap4','Jquery'],
    },
    {
        image:'ocbs-laptop.png',
        title:'OCBS/CRM',
        role:'Fullstack Developer',
        objective:[
            "To track the Kios Application's progress, streamlined with departments (Finance, Sales, Helpdesk, Audit) and third-party companies..",
            "To monitor inventory for equipment at each kiosk site and in company storage."
            ],
        responsibilities:[
            "Develop front-end website architecture.",
            "Design user interaction on web pages.",
            "Develop back-end website application.",
            "Design and implement database structures.",
            "Optimize database queries for efficiency and performance.",
            "Define endpoints and data formats for communication between different parts of the application.",
            "Work alongside graphic designer for web design features.",
            "Ensure cross-platform optimization."
          ],
        techstack:['Codeigniter','Mysql','Html','Css','Bootstrap4','Jquery'],
    },
    {
        image:'lt-laptop.png',
        title:'ELOTTO',
        role:'Fullstack Developer',
        objective:[
        "Provide a user-friendly interface for purchasing lottery tickets online.",
        "Ensure secure payment processing for ticket purchases.",
        "Effortless deposit and withdrawal options available via our partnered merchants (Gcash, Paymaya, DragonPay, etc.).",
        "Provide informative content about each lottery game, including rules, odds, and past winning numbers.",
        "Regularly audit and review the platform's security measures to protect user data and transactions.",
      
        ],
        responsibilities:[
            "Develop front-end website architecture.",
            "Design user interaction on web pages.",
            "Develop back-end website application.",
            "Design and implement database structures.",
            "Optimize database queries for efficiency and performance.",
            "Configuration of Web Sockets (Ratchet).",
            "Define endpoints and data formats for communication between different parts of the application.",
            "Work alongside graphic designer for web design features.",
            "Ensure cross-platform optimization."
        ],
        techstack:['Codeigniter','Mysql','Socket(Rachet)','Html','Css','Bootstrap4','Jquery'],
    },
    {
        image:'gaming-laptop.png',
        title:'OtchoPlay - Gaming Platform',
        role:'Fullstack Developer',
        objective:[
            "To offer entertainment along with convenient and secure deposit and withdrawal options.",
            "To expand the variety of game categories and providers, including options like Evo, Cherry Etc."],
            responsibilities:[
                "Develop front-end website architecture.",
                "Design user interaction on web pages.",
                "Develop back-end website application.",
                "Design and implement database structures.",
                "Optimize database queries for efficiency and performance.",
                "Configuration of Web Sockets (Ratchet).",
                "Define endpoints and data formats for communication between different parts of the application.",
                "Work alongside graphic designer for web design features.",
                "Ensure cross-platform optimization."
            ],
            techstack:['Codeigniter','Mysql','Socket(Rachet)','Html','Css','Bootstrap4','Jquery'],
        
    },
    {
        image:'parking-laptop.png',
        title:'Parking Monitoring and Casher System',
        role:'Fullstack Developer',
        objective:[ 
            "To offer accurate tracking of parked vehicles, including their duration, and calculate the precise amount required for payment."
        ],
        responsibilities:[
            "Develop front-end website architecture.",
            "Design user interaction on web pages.",
            "Develop back-end website application.",
            "Design and implement database structures.",
            "Optimize database queries for efficiency and performance.",
            "Configuration of Web Sockets (Ratchet).",
            "Define endpoints and data formats for communication between different parts of the application.",
            "Work alongside graphic designer for web design features.",
            "Ensure cross-platform optimization."
        ],
        techstack:['Codeigniter','Mysql','Html','Css','Bootstrap4','Jquery'],
    },
   
 
];



const cardContainer= document.querySelector('#project-selection');

objectiveList.forEach((item, index)=>{
    const div = document.createElement('div');
    div.innerHTML = `<img class="image" src="./assets/image/project-image/${item.image}" alt="" draggable="false" onclick="viewProject(${index})"  />`;
    cardContainer.appendChild(div);
  
})

//default project
viewProject(0);

function viewProject(index){
 
    
    //animation for displaying project details
     var $projectView = $('#project-view');
    var currentIndex= $projectView.data('current-id');

        if(index != currentIndex){
            $('#project-view').data('current-id', index);
            $projectView.addClass('slide-in-top');
                
            setTimeout(function() {
                $projectView.removeClass('slide-in-top');
            }, 500);

        }





    const project = objectiveList[index];

    let objective= '';
            project.objective.forEach(element => {
                objective +=`<li>${element}</li>`;
        });
    // for( var i= 0 ; i <3; i++){
    //      objective +=project.objective[i]?`<li>${project.objective[i]}</li>`:'';

    // }
    let responsibilities=''
        project.responsibilities.forEach(element => {
            responsibilities +=`<li>${element}</li>`;
    });

    

    let techStack= '';
    project.techstack.forEach(element => {
        techStack +=`  <label>${element} </label>`;
    });

    $('.system').html(project.title)
    $('.card-picture').html(`<img src="./assets/image/project-image/${project.image}" alt=""  draggable="false" />`);
    $('.role').html(project.role);
    $('.objective-list').html(objective);
    $('.responsibilities-list').html(responsibilities);
    $('.tech-list').html(techStack)


}

const toggleModal = () => document.body.classList.toggle("open-modal");



// experience section 

const experienceList = [  
    {
        company: 'MDSCSI',
        date: 'August 2023 - Present',
        role: 'Fullstack Developer',
        description: `
            Translate UX wireframes to production-ready code. 
            Develop APIs for frontend-backend communication. 
            Integrate with backend and third-party APIs like Instapay, Pesonet. 
            Write PHP server-side code in Laravel, CodeIgniter. 
            Review, debug, and analyze user needs. 
            Code applications based on client requirements. 
            Design customizations for efficiency. 
            Support applications by fixing bugs and flaws.
        `,
    },
    {
        company: 'The pinnacle.',
        date: 'April 2023 - July 2024',
        role: 'Fullstack Developer',
        description: `
            Design and develop both front-end and back-end website elements, 
            including architecture, user interaction, database structures, 
            Web Sockets configuration, endpoint definition, and 
            cross-platform optimization, while collaborating with graphic 
            designers for web design features.
        `,
    },
    {
        company: 'Lucky8star Quest inc. - Alpahredph',
        date: 'June 2020 - January 2024',
        role: 'Fullstack Developer',
        description: `
            Design and develop both front-end and back-end website elements, 
            including architecture, user interaction, database structures, 
            Web Sockets configuration, endpoint definition, and 
            cross-platform optimization, while collaborating with graphic 
            designers for web design features.
        `,
    },
    {
        company: '24/7 Intouch',
        date: 'June 2019 - August 2018',
        role: 'Technical Support Intern',
        description: `
            Provide level 1 Support, handle troubleshooting and
            maintenance as well as monitoring and deployment of
            IT equipment, escalate and update assigned tickets,
            inventory of IT equipment and assisting on Build-Out
            Project.
        `,
    },
    {
        company: 'Education',
        date: '2016 - 2020',
        role: 'Bachelor of Science Information Technology',
        description: ``,
    },
];


function appendMoreDetails() {
    let htmlStructure = '';

    experienceList.forEach(item=>{
        htmlStructure += `
        <li>
          <div class="right_content">
            <h3>${item.company}</h3>
            <h4>${item.role}</h4>
            <p>${item.description}</p>
          </div>
          <div class="left_content">
            <h6>${item.date}</h6>
          </div>
        </li>
      `;
    });

    htmlStructure += '<div style="clear:both;"></div>'; 
    
    // Append HTML structure to the parentList using jQuery
    $("#parentList").html(htmlStructure);
}

appendMoreDetails();
