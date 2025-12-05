# Deployment Guide (Render Blueprint)

This project is configured for automatic deployment on Render using `render.yaml`.

## How to Deploy

1.  **Log in to Render**
    *   Go to [dashboard.render.com](https://dashboard.render.com/).

2.  **Create a New Blueprint**
    *   Click **"New +"** and select **"Blueprint"**.
    *   Connect your `stock_broker` repository.

3.  **Deploy**
    *   Render will automatically detect the `render.yaml` file.
    *   Click **"Apply"**.
    *   Your site will be live in a few minutes!

## Manual Deployment (Alternative)
If you prefer not to use Blueprints:
1.  Create a **Static Site** on Render.
2.  Connect your repo.
3.  **Build Command**: `npm run build`
4.  **Publish Directory**: `dist`
5.  **Rewrite Rule**: Source `/*` -> Destination `/index.html`
