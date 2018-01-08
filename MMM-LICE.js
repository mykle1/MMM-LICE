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
	    source: "USD",       // USD unless you upgrade from free plan
		symbols: "",         // Add in config file
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
        this.url = "http://apilayer.net/api/live?access_key=" + this.config.accessKey + "&currencies=" + this.config.symbols + "&source=" + this.config.source + "&format=1";
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
        source.innerHTML = "Source Currency = " + this.config.source;
        wrapper.appendChild(source);
		
		
		// this gets the key from the key/pair of the element (hasOwnProperty)
		for (var Key in LICE.quotes) {
		if (LICE.quotes.hasOwnProperty(Key)) {
	
		
	//// Learned this on jsfiddle. HOORAY!
	//// This dynamically creates the div/tags for each element of LICE.quotes
		var symbols = LICE.quotes;
		for (var c in symbols) {
		
			var newElement = document.createElement("div");
			newElement.classList.add("xsmall", "bright", "symbol");
			newElement.innerHTML += Key + ' = '+ LICE.quotes[Key]; // + " = " + symbols[c];
			}
		}
			wrapper.appendChild(newElement);
			
	} // <-- closes key/pair loop
		
        return wrapper;
		
    }, // closes getDom
    
    
    /////  Add this function to the modules you want to control with voice //////

    notificationReceived: function(notification, payload) {
        if (notification === 'HIDE_LICE') {
            this.hide(1000);
            this.updateDom(300);
        }  else if (notification === 'SHOW_LICE') {
            this.show(1000);
            this.updateDom(300);
        }
            
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
