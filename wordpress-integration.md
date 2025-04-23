# WordPress Integration Guide

This document explains how to integrate the Canva Pro EDU landing page with WordPress and WooCommerce.

## Prerequisites

- WordPress installed
- WooCommerce plugin installed and configured
- Basic knowledge of WordPress administration

## Step 1: Create WooCommerce Products

1. Go to **WooCommerce > Products > Add New**
2. Create the following products:

### Product 1: 15 Days Canva Pro
- **Title**: Canva Pro EDU - 15 Days
- **Regular Price**: ₹69
- **Slug**: canva-15days
- **Description**: Add details about what's included

### Product 2: 1 Month Canva Pro
- **Title**: Canva Pro EDU - 1 Month
- **Regular Price**: ₹99
- **Slug**: canva-1month
- **Description**: Add details about what's included

### Product 3: 2 Months Canva Pro
- **Title**: Canva Pro EDU - 2 Months
- **Regular Price**: ₹179
- **Slug**: canva-2months
- **Description**: Add details about what's included

## Step 2: Add Landing Page to WordPress

### Method 1: Using Elementor or Other Page Builder

1. Create a new page in WordPress
2. Use a full-width template
3. Import the design using your page builder's tools

### Method 2: Using Custom HTML

1. Create a new page in WordPress
2. Select the "Custom HTML" block
3. Copy and paste the contents of `index.html`
4. Upload the CSS and JS files to your theme directory
5. Add stylesheet and script links in your theme's header

### Method 3: Creating a Custom Page Template

1. Upload all files to your theme directory
2. Create a new file called `page-canva-landing.php` in your theme
3. Add the following code to the top of the file:

```php
<?php
/**
 * Template Name: Canva Landing Page
 */

get_header();
?>

<!-- Paste the HTML content here -->

<?php
get_footer();
?>
```

4. Create a new page and select "Canva Landing Page" as the template

## Step 3: Configure WooCommerce Checkout

1. Go to **WooCommerce > Settings > Payments**
2. Make sure PhonePe or your preferred payment gateway is enabled
3. Configure the payment gateway according to your requirements

## Step 4: Set Up Order Notifications

1. Go to **WooCommerce > Settings > Emails**
2. Configure email notifications for both admin and customers
3. Optionally, consider adding a WhatsApp notification plugin for WhatsApp delivery

## Step 5: Testing

1. Test the entire purchase flow from landing page to checkout
2. Make sure all links work correctly
3. Test on both mobile and desktop devices

## Troubleshooting

- If the styles aren't loading, check that the CSS file path is correct
- If button links don't work, verify that the product slugs match exactly
- For responsive issues, test on various devices and screen sizes 