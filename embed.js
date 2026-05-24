(function () {
  if (window.__ddWidgetLoaded) return;
  window.__ddWidgetLoaded = true;

  var script = document.currentScript;
  var key = script && script.getAttribute("data-widget-key");
  if (!key) {
    console.error("[DD Widget] Missing data-widget-key attribute.");
    return;
  }

  var host = script.getAttribute("data-widget-host") || script.src.replace(/\/widget\/embed\.js.*$/, "");
  var target = script.getAttribute("data-widget-target") || "#dd-widget";
  var accentColor = script.getAttribute("data-widget-color") || "#2563EB";

  var COLLAPSED_HEIGHT = 56;
  var EXPANDED_HEIGHT = 520;
  var expanded = false;

  function init() {
    var container = document.querySelector(target);
    if (!container) {
      console.error("[DD Widget] Target element not found:", target);
      return;
    }

    var style = document.createElement("style");
    style.textContent =
      ".dd-widget-wrap{" +
        "position:relative;width:100%;max-width:560px;margin:0 auto;" +
        "border-radius:16px;overflow:hidden;" +
        "background:rgba(255,255,255,0.08);" +
        "backdrop-filter:blur(24px) saturate(1.4);" +
        "-webkit-backdrop-filter:blur(24px) saturate(1.4);" +
        "border:1px solid rgba(255,255,255,0.18);" +
        "box-shadow:0 8px 32px rgba(0,0,0,0.25),inset 0 1px 0 rgba(255,255,255,0.15);" +
        "transition:height .4s cubic-bezier(.4,0,.2,1);" +
        "height:" + COLLAPSED_HEIGHT + "px;" +
      "}" +
      ".dd-widget-wrap.dd-expanded{" +
        "height:" + EXPANDED_HEIGHT + "px;" +
      "}" +

      /* --- collapsed state: single row with icon + input + button --- */
      ".dd-widget-input-bar{" +
        "display:flex;align-items:center;gap:10px;" +
        "padding:8px 12px;" +
        "height:" + COLLAPSED_HEIGHT + "px;" +
        "box-sizing:border-box;" +
      "}" +
      ".dd-widget-spark{" +
        "display:flex;align-items:center;gap:6px;flex-shrink:0;" +
        "pointer-events:none;transition:opacity .3s,width .3s;" +
        "overflow:hidden;white-space:nowrap;" +
      "}" +
      ".dd-widget-wrap.dd-expanded .dd-widget-spark{" +
        "opacity:0;width:0;gap:0;padding:0;" +
      "}" +
      ".dd-widget-spark svg{width:18px;height:18px;flex-shrink:0;opacity:0.7}" +
      ".dd-widget-spark span{" +
        "font-size:12px;color:rgba(255,255,255,0.55);font-weight:500;" +
        "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;" +
      "}" +
      ".dd-widget-input-bar input{" +
        "flex:1;min-width:0;height:38px;border:none;outline:none;" +
        "background:rgba(255,255,255,0.12);" +
        "border-radius:10px;padding:0 14px;" +
        "font-size:14px;color:#fff;" +
        "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;" +
        "transition:background .2s;" +
      "}" +
      ".dd-widget-input-bar input::placeholder{color:rgba(255,255,255,0.5)}" +
      ".dd-widget-input-bar input:focus{background:rgba(255,255,255,0.18)}" +
      ".dd-widget-send-btn{" +
        "width:38px;height:38px;border:none;border-radius:10px;cursor:pointer;" +
        "background:" + accentColor + ";" +
        "display:flex;align-items:center;justify-content:center;" +
        "transition:opacity .2s,transform .15s;opacity:0.7;" +
        "flex-shrink:0;" +
      "}" +
      ".dd-widget-send-btn:hover{opacity:1;transform:scale(1.05)}" +
      ".dd-widget-send-btn svg{width:16px;height:16px;fill:#fff}" +

      /* --- expanded state: iframe fills top, input bar hidden --- */
      ".dd-widget-frame{" +
        "width:100%;height:100%;border:none;" +
        "background:transparent;display:none;" +
      "}" +
      ".dd-widget-wrap.dd-expanded .dd-widget-input-bar{display:none}" +
      ".dd-widget-wrap.dd-expanded .dd-widget-frame{display:block}" +

      /* --- mobile --- */
      "@media(max-width:640px){" +
        ".dd-widget-wrap{max-width:100%;border-radius:12px}" +
        ".dd-widget-wrap.dd-expanded{height:" + (EXPANDED_HEIGHT - 40) + "px}" +
        ".dd-widget-spark span{display:none}" +
      "}";

    document.head.appendChild(style);

    // --- Build DOM ---
    var wrap = document.createElement("div");
    wrap.className = "dd-widget-wrap";

    // Input bar (the collapsed view: icon + input + send)
    var bar = document.createElement("div");
    bar.className = "dd-widget-input-bar";

    var spark = document.createElement("div");
    spark.className = "dd-widget-spark";
    spark.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M12 2L14.09 8.26L20 9.27L15.55 13.97L16.91 20L12 16.9L7.09 20L8.45 13.97L4 9.27L9.91 8.26L12 2Z" fill="rgba(255,255,255,0.7)"/>' +
      "</svg>" +
      "<span>AI-Powered Estimate</span>";

    var input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Tell us about your project...";
    input.setAttribute("aria-label", "Describe your project");

    var sendBtn = document.createElement("button");
    sendBtn.className = "dd-widget-send-btn";
    sendBtn.type = "button";
    sendBtn.setAttribute("aria-label", "Send");
    sendBtn.innerHTML =
      '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>' +
      "</svg>";

    bar.appendChild(spark);
    bar.appendChild(input);
    bar.appendChild(sendBtn);

    // iframe (hidden until expanded)
    var frame = document.createElement("iframe");
    frame.className = "dd-widget-frame";
    frame.setAttribute("allow", "clipboard-write");
    frame.setAttribute("title", "Get a project estimate");

    wrap.appendChild(bar);
    wrap.appendChild(frame);
    container.appendChild(wrap);

    // --- Expand + load iframe ---
    function expand(firstMessage) {
      if (expanded) return;
      expanded = true;
      wrap.classList.add("dd-expanded");
      if (!frame.src) {
        frame.src = host + "/widget/default?key=" + encodeURIComponent(key) + "&mode=inline";
      }
      if (firstMessage) {
        var trySend = function (attempts) {
          if (attempts > 30) return;
          try {
            frame.contentWindow.postMessage({ type: "dd-widget-message", text: firstMessage }, "*");
          } catch (_) { /* ignore */ }
          setTimeout(function () { trySend(attempts + 1); }, 300);
        };
        frame.addEventListener("load", function () { trySend(0); }, { once: true });
      }
    }

    sendBtn.addEventListener("click", function () {
      var text = input.value.trim();
      if (text) {
        expand(text);
        input.value = "";
      } else {
        expand();
      }
    });

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        var text = input.value.trim();
        if (text) {
          expand(text);
          input.value = "";
        }
      }
    });

    // Listen for resize messages from iframe
    window.addEventListener("message", function (e) {
      if (e.data && e.data.type === "dd-widget-resize" && typeof e.data.height === "number") {
        var h = Math.min(Math.max(e.data.height, EXPANDED_HEIGHT), 700);
        wrap.style.height = h + "px";
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
