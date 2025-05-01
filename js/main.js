// DOM Elements
const heroContent = document.getElementById('hero-content');
const projectsGrid = document.getElementById('projects-grid');
const skillsContainer = document.getElementById('skills-container');
const timeline = document.getElementById('timeline');
const contactInfo = document.getElementById('contact-info');
const contactForm = document.getElementById('contact-form');

// Functions to generate HTML
function loadHero(data) {
    heroContent.innerHTML = `
        <div class="hero-content">
            <div class="hero-text">
                <h1>Hi, I'm <span>${data.hero.name}</span></h1>
                <h2>${data.hero.title}</h2>
                <p>${data.hero.bio}</p>
                <a href="#contact" class="btn">Contact Me</a>
                <div class="social-icons">
                    ${data.hero.social.map(social => `
                        <a href="${social.url}">   <i class="${social.icon}">   </i></a>
                    `).join('')}
                </div>
            </div>
            
        </div>
    `;
}

function loadProjects(data) {
    projectsGrid.innerHTML = data.projects.map(project => `
        <div class="project-card">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${project.links.map(link => `
                        <a href="${link.url}"><i class="${link.icon}"></i> ${link.text}</a>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

function loadSkills(data) {
    skillsContainer.innerHTML = `
        <h3>Languages</h3>
        <ul>
            ${data.skills.languages.map(lang => `
                <li>${lang.name} - ${lang.level}</li>
            `).join('')}
        </ul>
        <h3>Frameworks</h3>
        <ul>
            ${data.skills.frameworks.map(fw => `
                <li>${fw.name} - ${fw.level}</li>
            `).join('')}
        </ul>
    `;
}

function loadExperience(data) {
    timeline.innerHTML = data.experience.map(exp => `
        <div>
            <h3>${exp.title} at ${exp.company}</h3>
            <p>${exp.date}</p>
            <p>${exp.description}</p>
        </div>
    `).join('');
}

function loadContact(data) {
    contactInfo.innerHTML = `
        <p>Email: <a href="mailto:${data.contact.email}">${data.contact.email}</a></p>
        <p>Phone: <a href="tel:${data.contact.phone}">${data.contact.phone}</a></p>
        <p>Location: ${data.contact.location}</p>
        <div class="social-icons">
            ${data.hero.social.map(social => `
                <div> <a href="${social.url}"><i class="${social.icon}"></i></a> </div>
            `).join('')}
        </div>
    `;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetch('js/portfolioData.json')
        .then(response => response.json())
        .then(data => {
            loadHero(data);
            loadProjects(data);
            loadSkills(data);
            loadExperience(data);
            loadContact(data);

            // Update copyright year
            document.getElementById('year').textContent = new Date().getFullYear();
        })
        .catch(error => console.error('Error loading portfolio data:', error));
});