/* Magic Mirror
 * Module: MMM-LICE
 *
 * By Mykle1
 *
 */
Module.register("MMM-LICE", {

    // Module config defaults.
    defaults: {
		accessKey: "",       // Free account & API Access Key at currencylayer.com
	    source: "",          // The source currency
		x1: "",              // Currency you want exchanged
		x2: "",              // Currency you want exchanged
		x3: "",              // Currency you want exchanged
		x4: "",              // Currency you want exchanged
        useHeader: false,    // true if you want a header      
        header: "",          // Any text you want. useHeader must be true
        maxWidth: "300px",
        animationSpeed: 3000,
        initialLoadDelay: 4250,
        retryDelay: 2500,
        updateInterval: 45 * 60* 1000, // 45 min = 992 in a 31 day month (1000 free per month)

    },

    getStyles: function() {
        return ["MMM-LICE.css"];
    },

    getScripts: function() {
        return ["moment.js"];
    },

    start: function() {
        Log.info("Starting module: " + this.name);

        requiresVersion: "2.1.0",

        //  Set locale.
        this.url = "http://apilayer.net/api/live?access_key=" + this.config.accessKey + "&currencies=" + this.config.source + "," + this.config.x1 + "," + this.config.x2 + "," + this.config.x3 + "," + this.config.x4 + "&format=1";
        this.LICE = {};
        this.scheduleUpdate();
    },

    getDom: function() {

        var wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        wrapper.style.maxWidth = this.config.maxWidth;

        if (!this.loaded) {
            wrapper.innerHTML = this.translate("Show me the money . . .");
            wrapper.classList.add("bright", "light", "small");
            return wrapper;
        }

        if (this.config.useHeader != false) {
            var header = document.createElement("header");
            header.classList.add("small", "bright", "light", "header");
            header.innerHTML = this.config.header;
            wrapper.appendChild(header);
        }

        var LICE = this.LICE;
		

        var top = document.createElement("div");
        top.classList.add("list-row");


        // timestamp
        var timestamp = document.createElement("div");
        timestamp.classList.add("xsmall", "bright", "timestamp");
        timestamp.innerHTML = "Rate as of " + moment.unix(LICE.timestamp).format('h:mm a') + " today";
        wrapper.appendChild(timestamp);


        // source currency
        var source = document.createElement("div");
        source.classList.add("xsmall", "bright", "source");
        source.innerHTML = "Source Currency = " + LICE.source;
        wrapper.appendChild(source);
		
		
		// exchange quote1
        var quote1 = document.createElement("div");
        quote1.classList.add("xsmall", "bright", "quote1");
        quote1.innerHTML = this.config.x1 + "&nbsp = &nbsp" + LICE.quotes.USDAUD;
        wrapper.appendChild(quote1);
		
		// exchange quote2
        var quote2 = document.createElement("div");
        quote2.classList.add("xsmall", "bright", "quote2");
        quote2.innerHTML = this.config.x2 + "&nbsp = &nbsp" + LICE.quotes.USDCAD;
        wrapper.appendChild(quote2);
		
		// exchange quote3
        var quote3 = document.createElement("div");
        quote3.classList.add("xsmall", "bright", "quote3");
        quote3.innerHTML = this.config.x3 + "&nbsp = &nbsp" + LICE.quotes.USDPLN;
        wrapper.appendChild(quote3);
		
		// exchange quote4
        var quote4 = document.createElement("div");
        quote4.classList.add("xsmall", "bright", "quote4");
        quote4.innerHTML = this.config.x4 + "&nbsp = &nbsp" + LICE.quotes.USDMXN;
        wrapper.appendChild(quote4);

		
        return wrapper;
    },


    processLICE: function(data) {
        this.LICE = data;
	//	console.log(this.LICE);
        this.loaded = true;
    },

    scheduleUpdate: function() {
        setInterval(() => {
            this.getLICE();
        }, this.config.updateInterval);
        this.getLICE(this.config.initialLoadDelay);
    },

    getLICE: function() {
        this.sendSocketNotification('GET_LICE', this.url);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "LICE_RESULT") {
            this.processLICE(payload);

            this.updateDom(this.config.animationSpeed);
        }
        this.updateDom(this.config.initialLoadDelay);
    },
});
