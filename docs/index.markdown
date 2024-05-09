---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
---
<section class="hero">
    <div class="backdrop">
        <header>
            <h1 class="h1 text-white">{{ page.title | default: site.title | default: site.github.repository_name }}</h1>
            <h2 class="h2 text-white">{{ page.description | default: site.description | default: site.github.project_tagline }}</h2>
        </header>
        <div>
            <a href="https://youtu.be/e5NlmNhwrJk?si=1fDZP7B35ORBeoX-" target="_blank" class="btn btn-danger">Get Started for Free</a>
        </div>
    </div>
</section>
<br/>
<section class="container">
    <section id="#feature-highlights" class="text-center">
    <h3>Features Highlight</h3>
    <br/>
    <div class="row">
    <div class="col-12 col-md-4">
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="var(--bs-red)" class="bi bi-bar-chart" viewBox="0 0 16 16">
    <path d="M4 11H2v3h2zm5-4H7v7h2zm5-5v12h-2V2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1z"/>
    </svg>
    <h4>Burndown Chart Visualization</h4>
    <p>Visualize Your Progress&ndash;Keep your progects on track with real-time burndown charts</p>
    </div>
    <div class="col-12 col-md-4">
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="var(--bs-red)" class="bi bi-cash-coin" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"/>
    <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z"/>
    <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z"/>
    <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567"/>
    </svg>
    <h4>Integrated Financial Tracking</h4>
    <p>Manage Your Money&ndash;Link expenses directly to projects and forecast your income steadily.</p>
    </div>
    <div class="col-12 col-md-4">
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="var(--bs-red)" class="bi bi-exclamation-triangle" viewBox="0 0 16 16">
    <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"/>
    <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
    </svg>
    <h4>Customizable Alerts</h4>
    <p>Stay Informed&ndash;Custom alerts to keep you updated on project deadlines.</p>
    </div>
    </div>
    </section>
    <br/>
    <section id="#about">
    <h3 class="text-center">What's our story</h3>
    <br/>
    <p class="text-center">CodeCount is a solution to yearning demand all through the years as a self-taught software developer. I have often taken up freelance projects and one tool I hoped to use in my day to day project applying the agile and scrum development was the burndown chart. I first saw one in the American TV series "Silicon Valley" in the second or third season (can't really remember because it has been so long) in the year 2019 just when I started competitive programming. It was a rundown of the expected man-hours and efficiency to the actual man-hours and efficiency. It might be appalling but as a developer that admires visuals, I like to have a visual picture of how a project is going or has gone. So as a partial requirement of the ALX SWE programme, I decided to take up the challenge and build a custom burndown chart application with added features to manage finances as well which would essentially make the product stand out of the competition.</p>
    <h4>Team</h4>
    <br/>
    <article>
        <p>Ogechukwu, <strong>KANU</strong></p>
        <ul>
        <li><strong>LINKEDIN</strong>&ndash;<a href="https://www.linkedin.com/in/allison-ogechukwu-2383bb1a4/"  target="_blank">https://www.linkedin.com/in/allison-ogechukwu-2383bb1a4/</a></li>
        <li><strong>GITHUB</strong>&ndash;<a href="https://github.com/allisonOge"  target="_blank">https://github.com/allisonOge</a></li>
        <li><strong>TWITTER</strong>&ndash;<a href="https://twitter.com/iamallisonkanu"  target="_blank">https://twitter.com/iamallisonkanu</a></li>
        </ul>
    </article>
    <p>Visit or contribute to project&ndash;<a href="https://github.com/AllisonOge/codecount" target="_blank" class="btn btn-warning text-white"><span>project github</span></a></p>
    </section>
    <br/>
    <section class="text-center">
    <iframe width="100%" height="510" src="https://www.youtube.com/embed/W15XXcQgiwg" title="CodeCount Project Presentation" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </section>
    <br/>
    <section class="text-center">
    <p>Start Managing Your Freelance Projects Today&ndash;<a href="https://youtu.be/e5NlmNhwrJk?si=1fDZP7B35ORBeoX-" target="_blank" class="btn btn-danger">Sign Up for Free!</a></p>
    </section>
</section>
