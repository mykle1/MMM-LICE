## MMM-LICE

## Live International Currency Exchange

Well, almost live. It's more like hourly with the free API Access Key, but 
MMM-LICE sounded like such a cool name that I couldn't resist.

## What you get

* Real-time exchange rate for 168 World Currencies & PRECIOUS METALS

* Exact date and time (UNIX) the exchange rates were collected.

* 1000 free calls per month with free plan

* Annotated .css file included for coloring text and header.

## Examples

Many or few. You choose!

![](images/1.PNG) ![](images/2.PNG)

## Installation

* `git clone https://github.com/mykle1/MMM-LICE` into the `~/MagicMirror/modules` directory.

* Get your free API Access Key from https://currencylayer.com/ (Free plan)

* No dependencies needed! No kidding!


## Config.js entry and options

    {
        module: 'MMM-LICE',
        position: 'top_left',                 // Best in left, center, or right regions
        config: { 
			accessKey: "Your API Access Key", // Free account & API Access Key at currencylayer.com
			source: "USD",                    // USD unless you upgrade from free account
			symbols: "AUD,CHF,EUR,GBP",       // Currency symbols
			useHeader: false,                 
			header: "Show me the money",
			maxWidth: "300px",
        }
    },
	
## SpaceCowboysDude is outta round but he always fixes my mistakes