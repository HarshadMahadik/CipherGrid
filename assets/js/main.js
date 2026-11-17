/**
 * CipherGrid — Enterprise Cybersecurity & Threat Defense HTML5 Template
 * Author: Antigravity Commercial Template Factory
 * Target Marketplace: Codester
 * Version: 1.0.0
 * Pure Vanilla JavaScript ES6+ (No jQuery required)
 */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // =========================================================================
  // 1. STICKY HEADER & NAVBAR ACTIVE LINK
  // =========================================================================
  const header = document.querySelector(".cg-header");
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  // Set active class on current page link
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  // =========================================================================
  // 2. INTERACTIVE THREAT RADAR VISUALIZER (CANVAS)
  // =========================================================================
  const radarCanvas = document.getElementById("threatRadarCanvas");
  if (radarCanvas && radarCanvas.getContext) {
    const ctx = radarCanvas.getContext("2d");
    let angle = 0;
    const width = radarCanvas.width;
    const height = radarCanvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 15;

    // Simulated Threat Blips
    const blips = [
      { r: radius * 0.45, theta: 0.8, label: "CVE-2026-1049", type: "critical", alpha: 1 },
      { r: radius * 0.72, theta: 2.3, label: "BOTNET-SCAN", type: "high", alpha: 1 },
      { r: radius * 0.30, theta: 4.1, label: "API-ANOMALY", type: "medium", alpha: 1 },
      { r: radius * 0.85, theta: 5.4, label: "BRUTE-FORCE", type: "low", alpha: 1 }
    ];

    function drawRadar() {
      ctx.clearRect(0, 0, width, height);

      // Radar Background & Grid Circles
      ctx.fillStyle = "#070d1d";
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(56, 189, 248, 0.2)";
      ctx.lineWidth = 1;

      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, (radius / 4) * i, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Crosshairs
      ctx.beginPath();
      ctx.moveTo(centerX - radius, centerY);
      ctx.lineTo(centerX + radius, centerY);
      ctx.moveTo(centerX, centerY - radius);
      ctx.lineTo(centerX, centerY + radius);
      ctx.stroke();

      // Radar Sweep Cone
      const gradient = ctx.createConicGradient(angle, centerX, centerY);
      gradient.addColorStop(0, "rgba(56, 189, 248, 0.45)");
      gradient.addColorStop(0.12, "rgba(56, 189, 248, 0.0)");
      gradient.addColorStop(1, "rgba(56, 189, 248, 0.0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Draw Blips
      blips.forEach((blip) => {
        const bx = centerX + blip.r * Math.cos(blip.theta);
        const by = centerY + blip.r * Math.sin(blip.theta);

        // Blip Color
        let blipColor = "#ef4444";
        if (blip.type === "high") blipColor = "#f59e0b";
        if (blip.type === "medium") blipColor = "#38bdf8";
        if (blip.type === "low") blipColor = "#10b981";

        ctx.fillStyle = blipColor;
        ctx.beginPath();
        ctx.arc(bx, by, 4, 0, Math.PI * 2);
        ctx.fill();

        // Outer glow
        ctx.strokeStyle = blipColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(bx, by, 8, 0, Math.PI * 2);
        ctx.stroke();

        // Label
        ctx.fillStyle = "#e2e8f0";
        ctx.font = "10px monospace";
        ctx.fillText(blip.label, bx + 10, by + 3);
      });

      // Update Sweep Angle
      angle = (angle + 0.035) % (Math.PI * 2);
      requestAnimationFrame(drawRadar);
    }

    drawRadar();
  }

  // =========================================================================
  // 3. SECURITY ROI & RISK ASSESSMENT CALCULATOR
  // =========================================================================
  const endpointsSlider = document.getElementById("calcEndpoints");
  const industrySelect = document.getElementById("calcIndustry");
  const complianceSelect = document.getElementById("calcCompliance");

  const displayEndpoints = document.getElementById("valEndpoints");
  const displayExposure = document.getElementById("valExposure");
  const displaySavings = document.getElementById("valSavings");
  const displaySla = document.getElementById("valSla");

  if (endpointsSlider && displayExposure) {
    function calculateRoi() {
      const endpoints = parseInt(endpointsSlider.value, 10);
      const industryRisk = parseFloat(industrySelect ? industrySelect.value : 1.2);
      const complianceMultiplier = parseFloat(complianceSelect ? complianceSelect.value : 1.0);

      // Average estimated breach cost model per endpoint
      const baseBreachRisk = endpoints * 320 * industryRisk * complianceMultiplier;
      const estimatedSavings = baseBreachRisk * 0.78; // 78% risk mitigation with CipherGrid SOC
      const guaranteedSla = endpoints > 5000 ? "< 3 min" : "< 5 min";

      if (displayEndpoints) displayEndpoints.textContent = endpoints.toLocaleString();
      displayExposure.textContent = "$" + Math.round(baseBreachRisk).toLocaleString();
      displaySavings.textContent = "$" + Math.round(estimatedSavings).toLocaleString();
      if (displaySla) displaySla.textContent = guaranteedSla;
    }

    endpointsSlider.addEventListener("input", calculateRoi);
    if (industrySelect) industrySelect.addEventListener("change", calculateRoi);
    if (complianceSelect) complianceSelect.addEventListener("change", calculateRoi);

    calculateRoi();
  }

  // =========================================================================
  // 4. TRANSPARENT PRICING SWITCHER (MONTHLY / ANNUAL)
  // =========================================================================
  const pricingMonthlyBtn = document.getElementById("btnPricingMonthly");
  const pricingAnnualBtn = document.getElementById("btnPricingAnnual");
  const priceValues = document.querySelectorAll("[data-monthly-price]");

  if (pricingMonthlyBtn && pricingAnnualBtn) {
    function updatePricing(isAnnual) {
      if (isAnnual) {
        pricingAnnualBtn.classList.add("active");
        pricingMonthlyBtn.classList.remove("active");
        priceValues.forEach((el) => {
          const annual = el.getAttribute("data-annual-price");
          if (annual) el.textContent = "$" + annual;
        });
        document.querySelectorAll(".pricing-period").forEach((el) => {
          el.textContent = "/mo (billed annually)";
        });
      } else {
        pricingMonthlyBtn.classList.add("active");
        pricingAnnualBtn.classList.remove("active");
        priceValues.forEach((el) => {
          const monthly = el.getAttribute("data-monthly-price");
          if (monthly) el.textContent = "$" + monthly;
        });
        document.querySelectorAll(".pricing-period").forEach((el) => {
          el.textContent = "/month";
        });
      }
    }

    pricingMonthlyBtn.addEventListener("click", () => updatePricing(false));
    pricingAnnualBtn.addEventListener("click", () => updatePricing(true));
  }

  // =========================================================================
  // 5. CVE THREAT ADVISORY SEARCH & SEVERITY FILTER
  // =========================================================================
  const cveSearchInput = document.getElementById("cveSearchInput");
  const cveFilterBtns = document.querySelectorAll(".cve-filter-btn");
  const cveRows = document.querySelectorAll(".cve-row");

  if (cveRows.length > 0) {
    function filterAdvisories() {
      const query = cveSearchInput ? cveSearchInput.value.toLowerCase().trim() : "";
      const activeBtn = document.querySelector(".cve-filter-btn.active");
      const filterSeverity = activeBtn ? activeBtn.getAttribute("data-severity") : "all";

      cveRows.forEach((row) => {
        const text = row.textContent.toLowerCase();
        const severity = row.getAttribute("data-severity") || "";
        const matchesQuery = query === "" || text.includes(query);
        const matchesSeverity = filterSeverity === "all" || severity === filterSeverity;

        if (matchesQuery && matchesSeverity) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    }

    if (cveSearchInput) {
      cveSearchInput.addEventListener("input", filterAdvisories);
    }

    cveFilterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        cveFilterBtns.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
        filterAdvisories();
      });
    });
  }

  // =========================================================================
  // 6. CASE STUDIES CATEGORY FILTER
  // =========================================================================
  const caseFilterBtns = document.querySelectorAll(".case-filter-btn");
  const caseCards = document.querySelectorAll(".case-card-col");

  if (caseFilterBtns.length > 0 && caseCards.length > 0) {
    caseFilterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        caseFilterBtns.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
        const category = this.getAttribute("data-category");

        caseCards.forEach((card) => {
          if (category === "all" || card.getAttribute("data-category") === category) {
            card.style.display = "";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  // =========================================================================
  // 7. DEMONSTRATION FORM VALIDATION (HONEST DEMO NOTICE)
  // =========================================================================
  const forms = document.querySelectorAll(".cg-form-validate");
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add("was-validated");
        return;
      }

      form.classList.add("was-validated");

      // Show honest demonstration confirmation alert
      const statusBox = form.querySelector(".cg-form-status");
      if (statusBox) {
        statusBox.innerHTML = `
          <div class="alert alert-success d-flex align-items-center mt-3" role="alert">
            <i class="bi bi-check-circle-fill me-2 fs-5"></i>
            <div>
              <strong>Form Validated Successfully!</strong><br>
              <small class="text-secondary">Demo Mode: In a production deployment, this form submits via your custom backend (PHP / Node / Python / Zapier API). All input fields passed client-side validation.</small>
            </div>
          </div>
        `;
        statusBox.focus();
      }

      form.reset();
      form.classList.remove("was-validated");
    });
  });

  // =========================================================================
  // 8. BACK TO TOP BUTTON
  // =========================================================================
  const backToTopBtn = document.getElementById("btn-back-to-top");
  if (backToTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    }, { passive: true });

    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // =========================================================================
  // 9. COOKIE CONSENT BANNER (PERSISTENT VIA LOCALSTORAGE)
  // =========================================================================
  const cookieBar = document.getElementById("cookieConsentBar");
  const btnAcceptCookie = document.getElementById("btnAcceptCookie");

  if (cookieBar && btnAcceptCookie) {
    if (!localStorage.getItem("ciphergrid_cookie_consent")) {
      cookieBar.style.display = "block";
    }

    btnAcceptCookie.addEventListener("click", function () {
      localStorage.setItem("ciphergrid_cookie_consent", "true");
      cookieBar.style.display = "none";
    });
  }
});
