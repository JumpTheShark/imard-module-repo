"use strict";

const request         = require("../../../server/handlers/start"),
      expect          = require("chai").expect,
      http            = require("http"),
      requestHandlers = require("../../../server/handlers/requestHandlers");

const
    STATUS_CODE_OK          = requestHandlers.STATUS_CODE_OK,
    CONTENT_TYPE_TEXT_PLAIN = requestHandlers.CONTENT_TYPE_TEXT_PLAIN;

describe("Request start", () => {
	it("exists", () => {
		expect(request.start).not.to.be.an("undefined");
	});

    it("html body exists and is a string", () => {
        expect(request.BODY).to.be.a("string");
    });

    describe("response", () => {
        it("returns code " + STATUS_CODE_OK, () => {
            expect(request.start(new http.ServerResponse(() => {}, () => {})).statusCode).to.equal(STATUS_CODE_OK);
        });

        it("returns text", () => {
            expect(request.start(new http.ServerResponse(() => {}, () => {})).contentType).to.equal(CONTENT_TYPE_TEXT_PLAIN);
        });
    });
});