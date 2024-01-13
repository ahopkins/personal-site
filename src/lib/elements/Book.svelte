<section class="section">
    <div class="containter">
        <div class="content is-size-2">
            My book
            <a href="https://sanicbook.com">
                Python Web Development with Sanic
            </a>
            now available
        </div>
    </div>
</section>

<style>
    .section {
        background-color: #ff0d68;
        color: #000000;
        position: relative;
        transform: translateY(-100%);
    }
    .section a {
        color: #000000;
        font-weight: 700;
        text-decoration: underline;
    }
    .section a:hover {
        color: #111111;
    }
    @media (max-width: 800px) {
        .section {
            transform: translateY(-100vh);
            padding: 0.25rem !important;
        }
        .is-size-2 {
            font-size: 1.25rem !important;
        }
    }
</style>
