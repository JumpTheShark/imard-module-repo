"use strict";

const
	constants = require("../../server/constants"),
	expect    = require("chai").expect;

const
	STATUS_CODE_OK        = 200,
	STATUS_CODE_BAD       = 400,
	STATUS_CODE_NOT_FOUND = 404,
	CONTENT_TYPE_STR      = "Content-Type",
	TEXT_PLAIN_STR        = "text/plain";

describe("Constant ", () => {
	it("CONTENT_TYPE_TEXT_PLAIN exists and is isomorphic to { \"" + CONTENT_TYPE_STR + "\": \"" + TEXT_PLAIN_STR + "\" }", () => {
		expect(constants.CONTENT_TYPE_TEXT_PLAIN).not.to.be.an("undefined");
		expect(constants.CONTENT_TYPE_TEXT_PLAIN[CONTENT_TYPE_STR]).to.equal(TEXT_PLAIN_STR);
	});

	it("STATUS_CODE_OK is equal to " + STATUS_CODE_OK, () => {
		expect(constants.STATUS_CODE_OK).to.equal(STATUS_CODE_OK);
	});

	it("STATUS_CODE_BAD is equal to " + STATUS_CODE_BAD, () => {
		expect(constants.STATUS_CODE_BAD).to.equal(STATUS_CODE_BAD);
	});

	it("STATUS_CODE_NOT_FOUND is equal to " + STATUS_CODE_NOT_FOUND, () => {
		expect(constants.STATUS_CODE_NOT_FOUND).to.equal(STATUS_CODE_NOT_FOUND);
	});
});