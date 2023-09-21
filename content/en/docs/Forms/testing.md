---
title: "testing"
linkTitle: "testing"
date: 2023-03-02T11:40:29-05:00
Description: >
  Sandbox page
weight: 60
---

<script>
    function onPageLoad() {
        const currentUrl = window.location.href;
        if(!currentUrl.includes("/en/") && !currentUrl.includes("/es/") && !currentUrl.includes("/pt/")) {
            alert("Me quedo acá");
        } else {
            var urlSplit = currentUrl.split("docs");
            var newUrl = urlSplit[0].replace("en/","")+"es/docs"+urlSplit[1];
            window.location.href = newUrl.replace("testing.html", "checkout-form.html");
        }
    }

    document.addEventListener("DOMContentLoaded", onPageLoad);
</script>