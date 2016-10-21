"use strict";

const
	logger = require("../../../self_modules/logger/logger"),
	expect = require("chai").expect;

const logEnable = logger.configuration.enableLoggingIntoConsole;

describe("Logger", () => {
	it("exists", () => {
		expect(logger).not.to.be.an("undefined");
	});

	it("has a log function", () => {
		expect(logger.log).to.be.a("function");
	});

	it("logs if logging is enabled", () => {
		logger.configuration.enableLoggingIntoConsole = true;
		expect(logger.log("")).to.equal(true);
		logger.configuration.enableLoggingIntoConsole = logEnable;
	});

	describe("configuration property", () => {
		describe("enableLoggingIntoConsole", () => {
			it("exists", () => {
				expect(logEnable).not.to.be.an("undefined");
			});

			it("is a boolean", () => {
				expect(logEnable).to.be.a("boolean");
			});

			it("is equal to false", () => {
				expect(logEnable).to.equal(false);
			});
		});
	});
});