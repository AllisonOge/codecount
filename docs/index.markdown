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
            <input class="btn btn-danger btn-lg" type="button" value="Get Started for Free">
        </div>
    </div>
</section>
<br/>
<section class="container">
    <section class="text-center">
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
    <section>
    <!-- gif -->
    How it works (step-by-step guide)
    </section>
    <br/>
    <section class="text-center">
    <h3>Testimonials</h3>
    <br/>
    <div id="carouselTestimonials" class="carousel slide">
    <div class="carousel-inner d-flex align-items-stretch">
        <div class="carousel-item active">
        <div class="card bg-dark">
        <div class="card-body">
        <figure>
            <blockquote class="blockquote">
                <p>CodeCount has revolutionized how I manage my projects. The burndown charts and integrated financial tracking give me a clear overview of my progress and earnings. It’s exactly what I needed to stay organized and focused!</p>
            </blockquote>
            <figcaption class="blockquote-footer">
                Allison, ALX Student, Nigeria
            </figcaption>
            </figure>
        </div>
        </div>
        </div>
        <div class="carousel-item">
        <div class="card bg-dark">
        <div class="card-body">
        <figure>
            <blockquote class="blockquote">
                <p>Since I started using CodeCount, I’ve seen a significant improvement in managing my project deadlines and budgets. It’s intuitive, easy to use, and incredibly effective. Highly recommend for any freelancer who wants to take control of their workflow!</p>
            </blockquote>
            <figcaption class="blockquote-footer">
                Jane, Independent Software Engineer, Nigeria
            </figcaption>
            </figure>
        </div>
        </div>
        </div>
        <div class="carousel-item">
        <div class="card bg-dark">
        <div class="card-body">
        <figure>
            <blockquote class="blockquote">
                <p>I used to struggle with project scope creep and tracking my earnings accurately. CodeCount helps me keep everything under control with its powerful project management tools and easy-to-understand financial insights.</p>
            </blockquote>
            <figcaption class="blockquote-footer">
                Mary, ALX Alumni, Ghana
            </figcaption>
            </figure>
        </div>
        </div>
        </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselTestimonials" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselTestimonials" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
    </div>
    </section>
    <br/>
    <section class="text-center">
    <p>Start Managing Your Freelance Projects Today&ndash;<input class="btn btn-danger" type="button" value="Sign Up for Free!"></p>
    </section>
</section>
