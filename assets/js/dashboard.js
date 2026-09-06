/* =========================================================
   BIZORA DASHBOARD
   SIDEBAR + NAV DROPDOWNS + PROFILE + BUSINESS SWITCHER
   CHARTS + MODAL
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =====================================================
           ELEMENTS
        ====================================================== */

        const body =
            document.body;


        const sidebar =
            document.getElementById(
                "sidebar"
            );


        const sidebarToggle =
            document.getElementById(
                "sidebarToggle"
            );


        const desktopMenu =
            document.getElementById(
                "desktopMenu"
            );


        const mobileMenu =
            document.getElementById(
                "mobileMenu"
            );


        const sidebarClose =
            document.getElementById(
                "sidebarClose"
            );


        const sidebarOverlay =
            document.getElementById(
                "sidebarOverlay"
            );


        const quickAddBtn =
            document.getElementById(
                "quickAddBtn"
            );


        const quickAddModal =
            document.getElementById(
                "quickAddModal"
            );


        const modalClose =
            document.getElementById(
                "modalClose"
            );


        /* =====================================================
           CONSTANTS
        ====================================================== */

        const MOBILE_BREAKPOINT =
            850;



        /* =====================================================
           PROFILE DROPDOWN
        ====================================================== */

        const profileBtn =
            document.getElementById(
                "profileBtn"
            );


        const profileDropdown =
            document.getElementById(
                "profileDropdown"
            );


        function closeProfileDropdown() {

            if (!profileDropdown) {
                return;
            }


            profileDropdown.classList.remove(
                "show"
            );


            profileBtn?.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        function openProfileDropdown() {

            if (!profileDropdown) {
                return;
            }


            profileDropdown.classList.add(
                "show"
            );


            profileBtn?.setAttribute(
                "aria-expanded",
                "true"
            );

        }


        function toggleProfileDropdown(
            event
        ) {

            event?.stopPropagation();


            if (!profileDropdown) {
                return;
            }


            const isOpen =
                profileDropdown.classList.contains(
                    "show"
                );


            if (isOpen) {

                closeProfileDropdown();

            } else {

                openProfileDropdown();

            }

        }


        profileBtn?.addEventListener(
            "click",
            toggleProfileDropdown
        );



        /* =====================================================
           BUSINESS / BRANCH DROPDOWN
        ====================================================== */

        const businessSwitcher =
            document.getElementById(
                "businessSwitcher"
            );


        const businessSwitcherWrap =
            document.querySelector(
                ".business-switcher-wrap"
            );


        const businessDropdown =
            document.getElementById(
                "businessDropdown"
            );


        const businessBranch =
            document.getElementById(
                "businessBranch"
            );


        const businessOptions =
            document.querySelectorAll(
                ".business-option"
            );


        function closeBusinessDropdown() {

            if (!businessSwitcherWrap) {
                return;
            }


            businessSwitcherWrap.classList.remove(
                "open"
            );


            businessSwitcher?.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        function openBusinessDropdown() {

            if (!businessSwitcherWrap) {
                return;
            }


            businessSwitcherWrap.classList.add(
                "open"
            );


            businessSwitcher?.setAttribute(
                "aria-expanded",
                "true"
            );

        }


        businessSwitcher?.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();


                const isOpen =
                    businessSwitcherWrap?.classList.contains(
                        "open"
                    );


                if (isOpen) {

                    closeBusinessDropdown();

                } else {

                    openBusinessDropdown();

                }

            }
        );


        businessOptions.forEach(
            function (option) {

                option.addEventListener(
                    "click",
                    function (event) {

                        event.stopPropagation();


                        const selectedBranch =
                            option.getAttribute(
                                "data-business"
                            );


                        if (businessBranch) {

                            businessBranch.textContent =
                                selectedBranch;

                        }


                        businessOptions.forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        option.classList.add(
                            "active"
                        );


                        closeBusinessDropdown();

                    }
                );

            }
        );



        /* =====================================================
           SIDEBAR NAV DROPDOWNS
        ====================================================== */

        const navDropdownToggles =
            document.querySelectorAll(
                ".nav-dropdown-toggle"
            );


        const navDropdowns =
            document.querySelectorAll(
                ".nav-dropdown"
            );


        function closeAllNavDropdowns(
            except = null
        ) {

            navDropdowns.forEach(
                function (dropdown) {

                    if (
                        dropdown ===
                        except
                    ) {

                        return;

                    }


                    dropdown.classList.remove(
                        "open"
                    );


                    const button =
                        dropdown.querySelector(
                            ".nav-dropdown-toggle"
                        );


                    button?.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        }


        function toggleNavDropdown(
            button
        ) {

            const dropdown =
                button.closest(
                    ".nav-dropdown"
                );


            if (!dropdown) {
                return;
            }


            const isOpen =
                dropdown.classList.contains(
                    "open"
                );


            /*
             * Close every other dropdown first.
             */

            closeAllNavDropdowns(
                isOpen
                    ? null
                    : dropdown
            );


            /*
             * Toggle current dropdown.
             */

            if (isOpen) {

                dropdown.classList.remove(
                    "open"
                );


                button.setAttribute(
                    "aria-expanded",
                    "false"
                );

            } else {

                dropdown.classList.add(
                    "open"
                );


                button.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        }


        navDropdownToggles.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function (event) {

                        /*
                         * VERY IMPORTANT:
                         * Stop parent nav click.
                         * This keeps mobile/tablet drawer open.
                         */

                        event.preventDefault();
                        event.stopPropagation();


                        toggleNavDropdown(
                            button
                        );

                    }
                );

            }
        );



        /* =====================================================
           SUBMENU LINKS
        ====================================================== */

        const navSubmenuLinks =
            document.querySelectorAll(
                ".nav-submenu a"
            );


        navSubmenuLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        /*
                         * Allow normal navigation.
                         */

                        navSubmenuLinks.forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        link.classList.add(
                            "active"
                        );


                        /*
                         * On mobile/tablet,
                         * close drawer AFTER submenu
                         * navigation is selected.
                         */

                        if (
                            window.innerWidth <=
                            MOBILE_BREAKPOINT
                        ) {

                            closeMobileSidebar();

                        }

                    }
                );

            }
        );



        /* =====================================================
           SIDEBAR NORMAL NAVIGATION
        ====================================================== */

        /*
         * Only normal navigation items.
         *
         * Dropdown parents are intentionally excluded.
         *
         * This is the important fix for
         * mobile + tablet.
         */

        const normalNavItems =
            document.querySelectorAll(
                ".sidebar .nav-item:not(.nav-dropdown-toggle)"
            );


        normalNavItems.forEach(
            function (item) {

                item.addEventListener(
                    "click",
                    function (event) {

                        /*
                         * If the clicked element belongs
                         * to a dropdown parent, DO NOT
                         * close the mobile drawer.
                         */

                        if (
                            event.target.closest(
                                ".nav-dropdown-toggle"
                            )
                        ) {

                            return;

                        }


                        /*
                         * Close drawer only for
                         * real navigation items.
                         */

                        if (
                            window.innerWidth <=
                            MOBILE_BREAKPOINT
                        ) {

                            closeMobileSidebar();

                        }

                    }
                );

            }
        );



        /* =====================================================
           MOBILE SIDEBAR
        ====================================================== */

        function openMobileSidebar() {

            if (
                window.innerWidth >
                MOBILE_BREAKPOINT
            ) {

                return;

            }


            sidebar?.classList.add(
                "mobile-open"
            );


            sidebarOverlay?.classList.add(
                "show"
            );


            body.classList.add(
                "sidebar-open"
            );

        }


        function closeMobileSidebar() {

            sidebar?.classList.remove(
                "mobile-open"
            );


            sidebarOverlay?.classList.remove(
                "show"
            );


            body.classList.remove(
                "sidebar-open"
            );

        }



        /* =====================================================
           MOBILE MENU BUTTON
        ====================================================== */

        mobileMenu?.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();


                openMobileSidebar();

            }
        );


        sidebarClose?.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                closeMobileSidebar();

            }
        );


        sidebarOverlay?.addEventListener(
            "click",
            function () {

                closeMobileSidebar();

            }
        );



        /* =====================================================
           CLICK OUTSIDE
        ====================================================== */

        document.addEventListener(
            "click",
            function (event) {


                /* ---------------------------------------------
                   PROFILE
                --------------------------------------------- */

                if (
                    !event.target.closest(
                        ".header-profile-wrap"
                    )
                ) {

                    closeProfileDropdown();

                }



                /* ---------------------------------------------
                   BUSINESS SWITCHER
                --------------------------------------------- */

                if (
                    !event.target.closest(
                        ".business-switcher-wrap"
                    )
                ) {

                    closeBusinessDropdown();

                }



                /* ---------------------------------------------
                   SIDEBAR NAV DROPDOWNS
                --------------------------------------------- */

                if (
                    !event.target.closest(
                        ".sidebar-nav"
                    )
                ) {

                    closeAllNavDropdowns();

                }

            }
        );



        /* =====================================================
           ESCAPE KEY
        ====================================================== */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key !==
                    "Escape"
                ) {

                    return;

                }


                closeProfileDropdown();


                closeBusinessDropdown();


                closeAllNavDropdowns();


                closeMobileSidebar();


                closeQuickAddModal();

            }
        );



        /* =====================================================
           DESKTOP SIDEBAR TOGGLE
        ====================================================== */

        function updateDesktopToggle() {

            /*
             * Mobile / Tablet
             */

            if (
                window.innerWidth <=
                MOBILE_BREAKPOINT
            ) {

                if (sidebarToggle) {

                    sidebarToggle.hidden =
                        true;

                }


                if (desktopMenu) {

                    desktopMenu.hidden =
                        true;

                }


                return;

            }


            /*
             * Desktop
             */

            const isCollapsed =
                body.classList.contains(
                    "sidebar-collapsed"
                );



            /* ---------------------------------------------
               SIDEBAR X
            --------------------------------------------- */

            if (sidebarToggle) {

                sidebarToggle.hidden =
                    isCollapsed;


                sidebarToggle.setAttribute(
                    "aria-label",
                    "Collapse sidebar"
                );


                sidebarToggle.setAttribute(
                    "title",
                    "Collapse sidebar"
                );


                const sidebarIcon =
                    sidebarToggle.querySelector(
                        "i"
                    );


                if (sidebarIcon) {

                    sidebarIcon.classList.remove(
                        "fa-bars",
                        "fa-bars-staggered"
                    );


                    sidebarIcon.classList.add(
                        "fa-xmark"
                    );

                }

            }



            /* ---------------------------------------------
               TOPBAR MENU
            --------------------------------------------- */

            if (desktopMenu) {

                desktopMenu.hidden =
                    !isCollapsed;


                desktopMenu.setAttribute(
                    "aria-label",
                    "Open sidebar"
                );


                desktopMenu.setAttribute(
                    "title",
                    "Open sidebar"
                );


                const desktopIcon =
                    desktopMenu.querySelector(
                        "i"
                    );


                if (desktopIcon) {

                    desktopIcon.classList.remove(
                        "fa-xmark",
                        "fa-bars-staggered"
                    );


                    desktopIcon.classList.add(
                        "fa-bars"
                    );

                }

            }

        }



        /* =====================================================
           TOGGLE DESKTOP SIDEBAR
        ====================================================== */

        function toggleDesktopSidebar() {

            if (
                window.innerWidth <=
                MOBILE_BREAKPOINT
            ) {

                return;

            }


            body.classList.toggle(
                "sidebar-collapsed"
            );


            updateDesktopToggle();

        }


        sidebarToggle?.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                toggleDesktopSidebar();

            }
        );


        desktopMenu?.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                toggleDesktopSidebar();

            }
        );


        updateDesktopToggle();



        /* =====================================================
           RESPONSIVE RESET
        ====================================================== */

        window.addEventListener(
            "resize",
            function () {

                if (
                    window.innerWidth >
                    MOBILE_BREAKPOINT
                ) {

                    closeMobileSidebar();

                }


                updateDesktopToggle();

            }
        );



        /* =====================================================
           QUICK ADD MODAL
        ====================================================== */

        function openQuickAddModal() {

            if (!quickAddModal) {
                return;
            }


            quickAddModal.classList.add(
                "show"
            );


            body.style.overflow =
                "hidden";

        }


        function closeQuickAddModal() {

            if (!quickAddModal) {
                return;
            }


            quickAddModal.classList.remove(
                "show"
            );


            body.style.overflow =
                "";

        }


        quickAddBtn?.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                openQuickAddModal();

            }
        );


        modalClose?.addEventListener(
            "click",
            function () {

                closeQuickAddModal();

            }
        );



        /* =====================================================
           CLOSE MODAL ON BACKDROP
        ====================================================== */

        quickAddModal?.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    quickAddModal
                ) {

                    closeQuickAddModal();

                }

            }
        );



        /* =====================================================
           CHART FILTER BUTTONS
        ====================================================== */

        const chartFilters =
            document.querySelectorAll(
                ".chart-filter"
            );


        chartFilters.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        chartFilters.forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        button.classList.add(
                            "active"
                        );

                    }
                );

            }
        );



        /* =====================================================
           REVENUE CHART
        ====================================================== */

        const revenueCanvas =
            document.getElementById(
                "revenueChart"
            );


        if (
            revenueCanvas &&
            typeof Chart !==
            "undefined"
        ) {

            const revenueContext =
                revenueCanvas.getContext(
                    "2d"
                );


            const revenueGradient =
                revenueContext.createLinearGradient(
                    0,
                    0,
                    0,
                    260
                );


            revenueGradient.addColorStop(
                0,
                "rgba(99,91,255,.20)"
            );


            revenueGradient.addColorStop(
                1,
                "rgba(99,91,255,0)"
            );


            new Chart(
                revenueCanvas,
                {

                    type:
                        "line",


                    data:
                        {

                            labels:
                                [
                                    "Jan",
                                    "Feb",
                                    "Mar",
                                    "Apr",
                                    "May",
                                    "Jun",
                                    "Jul",
                                    "Aug",
                                    "Sep"
                                ],


                            datasets:
                                [

                                    {

                                        label:
                                            "Revenue",


                                        data:
                                            [
                                                42000,
                                                45000,
                                                43000,
                                                51000,
                                                49000,
                                                54000,
                                                57000,
                                                59000,
                                                62840
                                            ],


                                        borderColor:
                                            "#635bff",


                                        backgroundColor:
                                            revenueGradient,


                                        borderWidth:
                                            2,


                                        pointRadius:
                                            0,


                                        pointHoverRadius:
                                            4,


                                        tension:
                                            .42,


                                        fill:
                                            true

                                    },


                                    {

                                        label:
                                            "Expenses",


                                        data:
                                            [
                                                17000,
                                                18000,
                                                17500,
                                                19000,
                                                18500,
                                                20000,
                                                20500,
                                                21000,
                                                21450
                                            ],


                                        borderColor:
                                            "#cfd3dd",


                                        borderWidth:
                                            1.5,


                                        pointRadius:
                                            0,


                                        tension:
                                            .42,


                                        fill:
                                            false

                                    }

                                ]

                        },


                    options:
                        {

                            responsive:
                                true,


                            maintainAspectRatio:
                                false,


                            interaction:
                                {

                                    intersect:
                                        false,


                                    mode:
                                        "index"

                                },


                            plugins:
                                {

                                    legend:
                                        {
                                            display:
                                                false
                                        },


                                    tooltip:
                                        {

                                            backgroundColor:
                                                "#20232b",


                                            titleFont:
                                                {

                                                    family:
                                                        "Inter",

                                                    size:
                                                        10

                                                },


                                            bodyFont:
                                                {

                                                    family:
                                                        "Inter",

                                                    size:
                                                        10

                                                },


                                            padding:
                                                10,


                                            displayColors:
                                                false,


                                            callbacks:
                                                {

                                                    label:
                                                        function (
                                                            context
                                                        ) {

                                                            return (
                                                                "$" +
                                                                Number(
                                                                    context.raw
                                                                ).toLocaleString()
                                                            );

                                                        }

                                                }

                                        }

                                },


                            scales:
                                {

                                    x:
                                        {

                                            grid:
                                                {

                                                    display:
                                                        false

                                                },


                                            border:
                                                {

                                                    display:
                                                        false

                                                },


                                            ticks:
                                                {

                                                    color:
                                                        "#a2a9b6",


                                                    font:
                                                        {

                                                            family:
                                                                "Inter",


                                                            size:
                                                                9

                                                        }

                                                }

                                        },


                                    y:
                                        {

                                            beginAtZero:
                                                false,


                                            grid:
                                                {

                                                    color:
                                                        "#edf0f4",


                                                    drawBorder:
                                                        false

                                                },


                                            border:
                                                {

                                                    display:
                                                        false

                                                },


                                            ticks:
                                                {

                                                    color:
                                                        "#a2a9b6",


                                                    font:
                                                        {

                                                        family:
                                                            "Inter",

                                                        size:
                                                            8

                                                    },


                                                    callback:
                                                        function (
                                                            value
                                                        ) {

                                                            return (
                                                                "$" +
                                                                (
                                                                    value /
                                                                    1000
                                                                ) +
                                                                "k"
                                                            );

                                                        }

                                                }

                                        }

                                }

                        }

                }
            );

        }



        /* =====================================================
           PROFIT CHART
        ====================================================== */

        const profitCanvas =
            document.getElementById(
                "profitChart"
            );


        if (
            profitCanvas &&
            typeof Chart !==
            "undefined"
        ) {

            new Chart(
                profitCanvas,
                {

                    type:
                        "doughnut",


                    data:
                        {

                            labels:
                                [
                                    "Profit",
                                    "Remaining"
                                ],


                            datasets:
                                [

                                    {

                                        data:
                                            [
                                                65.8,
                                                34.2
                                            ],


                                        backgroundColor:
                                            [
                                                "#635bff",
                                                "#e8eaf0"
                                            ],


                                        borderWidth:
                                            0,


                                        hoverOffset:
                                            3

                                    }

                                ]

                        },


                    options:
                        {

                            responsive:
                                true,


                            maintainAspectRatio:
                                false,


                            cutout:
                                "74%",


                            plugins:
                                {

                                    legend:
                                        {
                                            display:
                                                false
                                        },


                                    tooltip:
                                        {
                                            enabled:
                                                false
                                        }

                                }

                        }

                }
            );

        }



        /* =====================================================
           ACTIVE NAVIGATION
        ====================================================== */

        const currentPage =
            window.location.pathname
                .split("/")
                .pop()
                .toLowerCase();


        document
            .querySelectorAll(
                ".nav-item"
            )
            .forEach(
                function (item) {

                    const href =
                        item.getAttribute(
                            "href"
                        );


                    if (
                        !href ||
                        href === "#"
                    ) {

                        return;

                    }


                    const itemPage =
                        href
                            .split("/")
                            .pop()
                            .toLowerCase();


                    if (
                        itemPage ===
                        currentPage
                    ) {

                        document
                            .querySelectorAll(
                                ".nav-item"
                            )
                            .forEach(
                                function (nav) {

                                    nav.classList.remove(
                                        "active"
                                    );

                                }
                            );


                        item.classList.add(
                            "active"
                        );

                    }

                }
            );



        /* =====================================================
           QUICK ACTIONS
        ====================================================== */

        document
            .querySelectorAll(
                ".quick-action"
            )
            .forEach(
                function (action) {

                    action.addEventListener(
                        "click",
                        function () {

                            openQuickAddModal();

                        }
                    );

                }
            );



        /* =====================================================
           MODAL ACTIONS
        ====================================================== */

        document
            .querySelectorAll(
                ".modal-action"
            )
            .forEach(
                function (action) {

                    action.addEventListener(
                        "click",
                        function () {

                            const title =
                                action.querySelector(
                                    "strong"
                                )?.textContent
                                ?.trim();


                            if (
                                title
                            ) {

                                console.log(
                                    "Quick action:",
                                    title
                                );

                            }


                            closeQuickAddModal();

                        }
                    );

                }
            );



    }
);