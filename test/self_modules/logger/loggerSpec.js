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
        describe("enableLoggingIntoConsole", () => {
            const enableLoggingIntoConsole = logger.configuration.enableLoggingIntoConsole;

            it("exists", () => {
                expect(enableLoggingIntoConsole).not.to.be.an("undefined");
            });

            it("is a boolean", () => {
                expect(enableLoggingIntoConsole).to.be.a("boolean");
            });

            it("is equal to false", () => {
                expect(enableLoggingIntoConsole).to.equal(false);
            });
        });
    });
});