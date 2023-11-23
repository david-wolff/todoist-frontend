# TODOIST frontend

## Getting started

Clone the repository

```bash
git clone git@github.com:antoniomesquita09/todoist-frontend.git
cd todoist-frontend
```

---

### Running locally

Use or install node version v18.16.0 with nvm:

```bash
nvm use
```

Install all dependencies:

```bash
npm install
```

First, run the development server:

```bash
npm run dev
```

Now the webapp is running on [http://localhost:3000](http://localhost:3000)

---

### Running with docker

Build the docker image from a deployed docker tag from **DockerHub**

```bash
docker build -t antoniomesquita09/todoist-frontend .
```

Run the deployed image locally

```bash
docker run -dp 0.0.0.0:3000:3000 antoniomesquita09/todoist-frontend
```

Now the webapp is running on [http://localhost:3000](http://localhost:3000)
