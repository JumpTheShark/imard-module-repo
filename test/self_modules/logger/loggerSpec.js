"use strict";

const logger  = require("../../../self_modules/logger/logger"),
      expect = require("chai").expect;

describe("Logger", () => {
    it("exists", () => {
        expect(logger).not.to.be.an("undefined");
    });

    it("has a log function", () => {
        expect(logger.log).to.be.a("function");
    });

    describe("configuration property", () => {
        describe("enable_logging_into_console", () => {
            const enable_logging_into_console = logger.configuration.enable_logging_into_console;

            it("exists", () => {
                expect(enable_logging_into_console).not.to.be.an("undefined");
            });

            it("is a boolean", () => {
                expect(enable_logging_into_console).to.be.a("boolean");
            });

            it("is equal to false", () => {
                expect(enable_logging_into_console).to.equal(false);
            });
        });
    });
});