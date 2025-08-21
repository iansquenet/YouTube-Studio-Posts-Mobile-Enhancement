// ==UserScript==
// @name         YouTube Studio & Posts Mobile Enhancement
// @namespace    github.com/iansquenet
// @version      2.6.3
// @description  Makes YouTube Studio and post creation interface truly mobile-friendly with proper responsive design
// @author       iansquenet
// @match        *://*.youtube.com/*
// @grant        GM_addStyle
// @updateURL    https://raw.githubusercontent.com/iansquenet/YouTube-Studio-Posts-Mobile-Enhancement/main/youtube-mobile-combined.user.js
// @downloadURL  https://raw.githubusercontent.com/iansquenet/YouTube-Studio-Posts-Mobile-Enhancement/main/youtube-mobile-combined.user.js
// ==/UserScript==

(function() {
    'use strict';

    // --- CSS STYLES ---
    const styles = `
/* ==UserStyle==
@name           YouTube Studio & Posts Mobile Enhancement
@namespace      github.com/iansquenet
@version        2.6.3
@description    Makes YouTube Studio and post creation interface truly mobile-friendly
@author         iansquenet
==/UserStyle== */

@-moz-document domain("studio.youtube.com"), domain("youtube.com"), domain("m.youtube.com") {
    
    /* ================================ */
    /* Critical Mobile Foundation */
    /* ================================ */
    @media screen and (max-width: 768px) {
        /* Force proper mobile viewport */
        html {
            -webkit-text-size-adjust: 100% !important;
            text-size-adjust: 100% !important;
        }
        
        html, body {
            width: 100% !important;
            max-width: 100% !important;
            overflow-x: hidden !important;
            margin: 0 !important;
            padding: 0 !important;
        }

        /* Reset all containers to mobile-first */
        *, *::before, *::after {
            box-sizing: border-box !important;
        }
        
        /* Prevent horizontal overflow on all elements */
        * {
            max-width: 100vw !important;
        }
    }

    /* ================================ */
    /* YouTube Studio Mobile Overhaul */
    /* ================================ */
    @media screen and (max-width: 768px) {
        /* Remove all desktop min-widths from Studio */
        ytcp-app,
        ytcp-app *,
        #page-manager,
        #main-content,
        .ytcp-page,
        ytcp-entity-page,
        ytcp-two-column-page,
        ytcp-analytics-section,
        ytcp-analytics-overview-card,
        ytcp-line-chart-card,
        tp-yt-paper-dialog {
            min-width: 0 !important;
            min-width: unset !important;
        }

        /* Studio App Container - Full Mobile Reset */
        ytcp-app {
            display: block !important;
            width: 100% !important;
            max-width: 100vw !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow-x: hidden !important;
        }

        /* Studio Header - Compact Mobile */
        ytcp-app-header {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            height: 56px !important;
            z-index: 1000 !important;
            background: var(--ytcp-general-background-a) !important;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
            padding: 0 8px !important;
            display: flex !important;
            align-items: center !important;
        }

        /* Add padding to account for fixed header */
        #page-manager,
        #content {
            padding-top: 56px !important;
        }

        /* Studio Sidebar - Off-canvas Mobile Menu */
        ytcp-app-sidebar {
            position: fixed !important;
            top: 56px !important;
            left: -100% !important;
            bottom: 0 !important;
            width: 280px !important;
            max-width: 85vw !important;
            background: var(--ytcp-general-background-a) !important;
            z-index: 999 !important;
            transition: transform 0.3s ease !important;
            transform: translateX(0) !important;
            box-shadow: 2px 0 10px rgba(0,0,0,0.2) !important;
            overflow-y: auto !important;
        }

        /* Sidebar open state */
        body.sidebar-open ytcp-app-sidebar,
        ytcp-app-sidebar.mobile-open {
            transform: translateX(100%) !important;
        }

        /* Sidebar backdrop */
        .sidebar-backdrop {
            display: none;
            position: fixed;
            top: 56px;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 998;
        }
        
        body.sidebar-open .sidebar-backdrop {
            display: block;
        }

        /* Main Content Area - Full Width Mobile */
        #main-content,
        #content,
        #page-manager {
            margin: 0 !important;
            padding: 8px !important;
            width: 100% !important;
            max-width: 100vw !important;
            overflow-x: hidden !important;
        }

        /* Cards - Mobile Optimized */
        ytcp-card,
        ytcp-analytics-card,
        ytcp-video-card,
        .metric-card {
            width: 100% !important;
            margin: 0 0 12px 0 !important;
            padding: 12px !important;
            border-radius: 8px !important;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
        }

        /* Dashboard Grid - Single Column */
        .dashboard-grid,
        .grid-layout,
        ytcp-dashboard-overview {
            display: block !important;
            width: 100% !important;
        }

        /* Analytics Charts - Responsive */
        ytcp-line-chart-card,
        .analytics-chart-container {
            width: 100% !important;
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
        }

        /* Chart canvas responsive */
        canvas {
            max-width: 100% !important;
            height: auto !important;
        }

        /* Video List/Table - Mobile Optimized */
        ytcp-video-row {
            display: flex !important;
            flex-wrap: wrap !important; /* Allow columns to wrap */
            align-items: flex-start !important;
            padding: 8px 0 !important; /* Reduce vertical padding */
            border-bottom: 1px solid var(--ytcp-divider) !important;
            gap: 8px; /* Space between wrapped items */
        }

        ytcp-video-list-cell {
            padding: 4px !important; /* Reduce padding on each cell */
            flex: 1 1 120px; /* Allow cells to grow and shrink */
            min-width: 120px; /* Prevent cells from becoming too narrow */
            display: flex;
            align-items: center;
        }

        /* Ensure the main video cell has more space and is always first */
        ytcp-video-list-cell[id*="video-list-cell-video"] { /* More robust selector */
            flex-basis: 100% !important; /* Take full width on its own line */
            order: -1; /* Ensure it comes first */
        }

        /* Recent subscribers card */
        ytcd-recent-activity-subscribers .subscriber-row {
            display: flex !important;
            align-items: center !important;
            gap: 12px !important;
        }

        /* Video thumbnail and info layout */
        ytcp-video-list-cell .video-thumbnail-container {
            float: left !important;
            width: 120px !important;
            margin-right: 12px !important;
        }

        ytcp-video-list-cell .video-info {
            overflow: hidden !important;
        }

        /* Video title - prevent overflow */
        ytcp-video-list-cell .video-title,
        #video-title {
            font-size: 14px !important;
            line-height: 1.3 !important;
            max-height: 2.6em !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 2 !important;
            -webkit-box-orient: vertical !important;
        }

        /* Metrics below video */
        ytcp-video-list-cell .cell-body {
            clear: both !important;
            padding-top: 8px !important;
            font-size: 12px !important;
        }

        /* Tables - Horizontal Scroll */
        ytcp-table,
        .table-container {
            display: block !important;
            width: 100% !important;
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
        }

        /* Tab Navigation - Scrollable */
        tp-yt-paper-tabs {
            width: 100% !important;
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
        }

        tp-yt-paper-tabs::-webkit-scrollbar {
            display: none !important;
        }

        #tabsContent {
            display: flex !important;
            flex-wrap: nowrap !important;
        }

        tp-yt-paper-tab {
            flex-shrink: 0 !important;
            padding: 8px 12px !important;
            font-size: 14px !important;
        }

        /* Buttons - Touch Optimized */
        .ytcp-button,
        tp-yt-paper-button,
        ytcp-button {
            min-height: 44px !important;
            min-width: 44px !important;
            padding: 8px 16px !important;
            font-size: 14px !important;
            touch-action: manipulation !important;
        }

        /* Icon buttons */
        ytcp-icon-button,
        tp-yt-iron-icon {
            min-width: 44px !important;
            min-height: 44px !important;
            padding: 10px !important;
        }

        /* Dialogs - Mobile Fullscreen */
        tp-yt-paper-dialog,
        ytcp-dialog {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            max-width: 100% !important;
            max-height: 100% !important;
            width: 100% !important;
            height: 100% !important;
            margin: 0 !important;
            border-radius: 0 !important;
        }

        /* Dialog content scrollable */
        tp-yt-paper-dialog .dialog-content,
        ytcp-dialog .content {
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch !important;
            max-height: calc(100vh - 120px) !important;
        }

        /* Form inputs */
        input, textarea, select {
            font-size: 16px !important; /* Prevents zoom on iOS */
            width: 100% !important;
            padding: 12px !important;
            border-radius: 4px !important;
            border: 1px solid var(--ytcp-divider) !important;
        }

        /* Dropdown menus */
        tp-yt-paper-listbox,
        .dropdown-content {
            max-height: 50vh !important;
            overflow-y: auto !important;
        }

        /* Remove desktop-only elements */
        .desktop-only,
        .hide-on-mobile {
            display: none !important;
        }

        /* Tooltips - Hide on mobile */
        tp-yt-paper-tooltip {
            display: none !important;
        }
    }

    /* ================================ */
    /* Posts & Community Tab Fixes */
    /* ================================ */
    
    /* Post content container - prevent overflow */
    ytd-backstage-post-renderer,
    ytm-backstage-post-renderer {
        width: 100% !important;
        max-width: 100% !important;
        overflow: hidden !important;
        word-wrap: break-word !important;
        word-break: break-word !important;
    }

    /* Post text content - force wrapping */
    #content-text,
    .content-text,
    ytd-backstage-post-renderer #content,
    ytm-backstage-post-renderer .content {
        width: 100% !important;
        max-width: 100% !important;
        white-space: pre-wrap !important;
        word-wrap: break-word !important;
        word-break: break-word !important;
        overflow-wrap: break-word !important;
        hyphens: auto !important;
        font-size: 14px !important;
        line-height: 1.4 !important;
    }

    /* Formatted strings in posts */
    yt-formatted-string {
        display: inline !important;
        max-width: 100% !important;
        word-wrap: break-word !important;
        word-break: break-word !important;
        overflow-wrap: break-word !important;
    }

    /* Links in posts */
    .yt-simple-endpoint,
    a.yt-formatted-string {
        display: inline !important;
        word-break: break-all !important;
        overflow-wrap: anywhere !important;
    }

    /* Post images - responsive */
    ytd-backstage-image-renderer,
    ytm-backstage-image-renderer,
    .post-image {
        width: 100% !important;
        max-width: 100% !important;
    }

    ytd-backstage-image-renderer img,
    ytm-backstage-image-renderer img {
        width: 100% !important;
        height: auto !important;
        max-width: 100% !important;
        object-fit: contain !important;
    }

    /* Multi-image carousel */
    @media screen and (max-width: 768px) {
        ytd-post-multi-image-renderer,
        ytm-post-multi-image-renderer {
            width: 100% !important;
            max-width: 100% !important;
            position: relative !important;
        }

        #scroll-container {
            width: 100% !important;
            overflow-x: auto !important;
            overflow-y: hidden !important;
            -webkit-overflow-scrolling: touch !important;
            scroll-snap-type: x mandatory !important;
            scrollbar-width: none !important;
        }

        #scroll-container::-webkit-scrollbar {
            display: none !important;
        }

        #items {
            display: flex !important;
            flex-wrap: nowrap !important;
            width: max-content !important;
        }

        #items > * {
            flex: 0 0 100% !important;
            width: 100vw !important;
            max-width: 100vw !important;
            scroll-snap-align: start !important;
        }

        /* Carousel navigation dots */
        .carousel-dots {
            display: flex !important;
            justify-content: center !important;
            gap: 6px !important;
            padding: 8px !important;
        }

        .carousel-dot {
            width: 8px !important;
            height: 8px !important;
            border-radius: 50% !important;
            background: var(--yt-spec-text-disabled) !important;
            transition: background 0.3s !important;
        }

        .carousel-dot.active {
            background: var(--yt-spec-text-primary) !important;
        }
    }

    /* Post dialog - mobile optimized */
    @media screen and (max-width: 768px) {
        ytd-backstage-post-dialog-renderer {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 100% !important;
            height: 100% !important;
            max-width: 100% !important;
            max-height: 100% !important;
            margin: 0 !important;
            border-radius: 0 !important;
            z-index: 9999 !important;
            background: var(--yt-spec-base-background) !important;
            display: flex !important;
            flex-direction: column !important;
        }

        /* Dialog header */
        ytd-backstage-post-dialog-renderer #dialog-header {
            padding: 12px !important;
            border-bottom: 1px solid var(--yt-spec-10-percent-layer) !important;
            display: flex !important;
            align-items: center !important;
            gap: 12px !important;
            flex-shrink: 0 !important;
        }

        /* Dialog body - scrollable */
        ytd-backstage-post-dialog-renderer #main {
            flex: 1 !important;
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch !important;
            padding: 12px !important;
        }

        /* Text input area */
        #contenteditable-root,
        #textbox {
            min-height: 150px !important;
            font-size: 16px !important;
            padding: 12px !important;
            width: 100% !important;
            border: 1px solid var(--yt-spec-10-percent-layer) !important;
            border-radius: 8px !important;
        }

        /* Attachment buttons */
        #attachments {
            display: grid !important;
            grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)) !important;
            gap: 8px !important;
            padding: 12px !important;
        }

        .attachment-button {
            min-height: 80px !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 4px !important;
            padding: 8px !important;
            border: 1px dashed var(--yt-spec-10-percent-layer) !important;
            border-radius: 8px !important;
            font-size: 12px !important;
        }

        /* Action buttons */
        ytd-backstage-post-dialog-renderer #buttons {
            padding: 12px !important;
            display: flex !important;
            gap: 12px !important;
            border-top: 1px solid var(--yt-spec-10-percent-layer) !important;
            flex-shrink: 0 !important;
        }

        #cancel-button,
        #post-button {
            flex: 1 !important;
            min-height: 44px !important;
            font-size: 14px !important;
            border-radius: 22px !important;
        }
    }

    /* Mobile Create Button */
    #mobile-create-post-button {
        position: fixed !important;
        bottom: 20px !important;
        right: 20px !important;
        z-index: 1000 !important;
        width: 56px !important;
        height: 56px !important;
        border-radius: 50% !important;
        background: var(--yt-spec-call-to-action, #065fd4) !important;
        color: white !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3) !important;
        font-size: 24px !important;
        border: none !important;
        cursor: pointer !important;
    }

    #mobile-create-post-button:active {
        transform: scale(0.95) !important;
    }

    /* Hamburger Menu Button */
    #hamburger-menu-button {
        display: none;
        position: fixed;
        top: 10px;
        left: 10px;
        z-index: 1001;
        width: 40px;
        height: 40px;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
    }

    @media screen and (max-width: 768px) {
        #hamburger-menu-button {
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            align-items: center !important;
            gap: 4px !important;
        }

        #hamburger-menu-button .line {
            width: 24px;
            height: 3px;
            background: var(--ytcp-text-primary);
            transition: all 0.3s;
            border-radius: 2px;
        }

        body.sidebar-open #hamburger-menu-button .line:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        body.sidebar-open #hamburger-menu-button .line:nth-child(2) {
            opacity: 0;
        }

        body.sidebar-open #hamburger-menu-button .line:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }

    /* Safe area padding for iOS */
    @supports (padding: max(0px)) {
        @media screen and (max-width: 768px) {
            ytcp-app-header {
                padding-top: env(safe-area-inset-top) !important;
                height: calc(56px + env(safe-area-inset-top)) !important;
            }

            #page-manager,
            #content {
                padding-top: calc(56px + env(safe-area-inset-top)) !important;
            }

            ytcp-app-sidebar {
                top: calc(56px + env(safe-area-inset-top)) !important;
                padding-bottom: env(safe-area-inset-bottom) !important;
            }

            #mobile-create-post-button {
                bottom: calc(20px + env(safe-area-inset-bottom)) !important;
            }
        }
    }
}
    `;

    // Apply styles
    GM_addStyle(styles);

    // --- JAVASCRIPT FUNCTIONALITY ---

    // Inject proper viewport meta tag
    function injectMetaTag() {
        let meta = document.querySelector('meta[name="viewport"]');
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = 'viewport';
            document.head.appendChild(meta);
        }
        meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
    }

    // Get channel ID from various sources
    function getChannelId() {
        // Studio URL
        if (window.location.hostname === 'studio.youtube.com') {
            const match = window.location.pathname.match(/\/channel\/([a-zA-Z0-9_-]+)/);
            if (match) return match[1];
        }

        // Channel link in menu
        const channelLink = document.querySelector('a[href*="/channel/"]');
        if (channelLink) {
            const match = channelLink.href.match(/\/channel\/([a-zA-Z0-9_-]+)/);
            if (match) return match[1];
        }

        // Try to find from page data
        try {
            const ytInitialData = window.ytInitialData || {};
            const channelId = ytInitialData?.metadata?.channelMetadataRenderer?.externalId;
            if (channelId) return channelId;
        } catch (e) {}

        return null;
    }

    // Handle create button click
    function handleCreateButtonClick() {
        const channelId = getChannelId();
        if (channelId) {
            window.location.href = `https://www.youtube.com/channel/${channelId}/community?show_create_dialog=1`;
        } else {
            alert("Please navigate to your channel's Community tab to create a post.");
        }
    }

    // Add floating create button on mobile
    function addCreateButton() {
        if (window.innerWidth > 768) return;
        if (document.getElementById('mobile-create-post-button')) return;

        const button = document.createElement('button');
        button.id = 'mobile-create-post-button';
        button.innerHTML = '+';
        button.title = 'Create Post';
        button.addEventListener('click', handleCreateButtonClick);
        document.body.appendChild(button);
    }

    // Add hamburger menu for Studio sidebar
    function addHamburgerMenu() {
        if (window.location.hostname !== 'studio.youtube.com') return;
        if (document.getElementById('hamburger-menu-button')) return;

        const button = document.createElement('button');
        button.id = 'hamburger-menu-button';
        button.innerHTML = '<span class="line"></span><span class="line"></span><span class="line"></span>';
        button.setAttribute('aria-label', 'Toggle menu');
        document.body.appendChild(button);

        const backdrop = document.createElement('div');
        backdrop.className = 'sidebar-backdrop';
        document.body.appendChild(backdrop);

        const toggleSidebar = () => {
            document.body.classList.toggle('sidebar-open');
            const sidebar = document.querySelector('ytcp-app-sidebar');
            if (sidebar) {
                sidebar.classList.toggle('mobile-open');
            }
        };

        button.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSidebar();
        });

        backdrop.addEventListener('click', toggleSidebar);
    }

    // Add carousel navigation for multi-image posts
    function enhanceImageCarousel(carousel) {
        if (carousel.dataset.enhanced) return;
        carousel.dataset.enhanced = 'true';

        const scrollContainer = carousel.querySelector('#scroll-container');
        if (!scrollContainer) return;

        // Add dot indicators
        const dots = document.createElement('div');
        dots.className = 'carousel-dots';
        carousel.appendChild(dots);

        const items = scrollContainer.querySelectorAll('#items > *');
        items.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                scrollContainer.scrollTo({
                    left: index * scrollContainer.clientWidth,
                    behavior: 'smooth'
                });
            });
            dots.appendChild(dot);
        });

        // Update active dot on scroll
        scrollContainer.addEventListener('scroll', () => {
            const index = Math.round(scrollContainer.scrollLeft / scrollContainer.clientWidth);
            dots.querySelectorAll('.carousel-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        });
    }

    // Fix table horizontal scrolling
    function fixTables() {
        const tables = document.querySelectorAll('ytcp-table, ytcp-data-table');
        tables.forEach(table => {
            if (!table.parentElement.classList.contains('table-scroll-wrapper')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'table-scroll-wrapper';
                wrapper.style.cssText = 'width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch;';
                table.parentElement.insertBefore(wrapper, table);
                wrapper.appendChild(table);
            }
        });
    }

    // Debounce function to limit the rate at which a function gets called.
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Main function to run all enhancements
    function runEnhancements() {
        if (window.innerWidth > 768) {
            const button = document.getElementById('mobile-create-post-button');
            if (button) button.remove();
            return; // Don't run on desktop
        }

        addCreateButton();
        fixTables();
        document.querySelectorAll('ytd-post-multi-image-renderer:not([data-enhanced]), ytm-post-multi-image-renderer:not([data-enhanced])').forEach(enhanceImageCarousel);
    }

    // --- INITIALIZATION ---
    function initialize() {
        injectMetaTag();
        addHamburgerMenu();

        // Initial run
        runEnhancements();

        // Use a single, debounced observer for performance
        const observer = new MutationObserver(debounce(runEnhancements, 100));
        observer.observe(document.body, { childList: true, subtree: true });

        // Re-run on resize (debounced)
        window.addEventListener('resize', debounce(runEnhancements, 250));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

})();