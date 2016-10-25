"use strict";

const
	constants = require("../../server/constants"),
	expect    = require("chai").expect;

const
	STATUS_CODE_OK        = 200,
	STATUS_CODE_BAD       = 400,
	STATUS_CODE_NOT_FOUND = 404,
	CONTENT_TYPE_STR      = "Content-Type",
	TEXT_PLAIN_STR        = "text/plain",
	TEXT_HTML_STR         = "text/html",
	COMMAND_RM_RF         = "rm -rf",
	COMMAND_MKDIR         = "mkdir";

describe("Constant ", () => {
	it(`CONTENT_TYPE is equal to ${CONTENT_TYPE_STR}`, () => {
		expect(constants.CONTENT_TYPE).to.equal(CONTENT_TYPE_STR);
	});

	it(`TEXT_PLAIN is equal to ${TEXT_PLAIN_STR}`, () => {
		expect(constants.TEXT_PLAIN).to.equal(TEXT_PLAIN_STR);
	});

	it(`TEXT_HTML is equal to ${TEXT_HTML_STR}`, () => {
		expect(constants.TEXT_HTML).to.equal(TEXT_HTML_STR);
	});

	it(`CONTENT_TYPE_TEXT_PLAIN exists and is isomorphic to {"${CONTENT_TYPE_STR}" : "${TEXT_PLAIN_STR}" }`, () => {
		expect(constants.CONTENT_TYPE_TEXT_PLAIN).not.to.be.an("undefined");
		expect(constants.CONTENT_TYPE_TEXT_PLAIN[CONTENT_TYPE_STR]).to.equal(TEXT_PLAIN_STR);
	});

	it(`CONTENT_TYPE_TEXT_HTML exists and is isomorphic to {"${CONTENT_TYPE_STR}" : "${TEXT_HTML_STR}" }`, () => {
		expect(constants.CONTENT_TYPE_TEXT_HTML).not.to.be.an("undefined");
		expect(constants.CONTENT_TYPE_TEXT_HTML[CONTENT_TYPE_STR]).to.equal(TEXT_HTML_STR);
	});

	it(`STATUS_CODE_OK is equal to ${STATUS_CODE_OK}`, () => {
		expect(constants.STATUS_CODE_OK).to.equal(STATUS_CODE_OK);
	});

	it(`STATUS_CODE_BAD is equal to ${STATUS_CODE_BAD}`, () => {
		expect(constants.STATUS_CODE_BAD).to.equal(STATUS_CODE_BAD);
	});

	it(`STATUS_CODE_NOT_FOUND is equal to ${STATUS_CODE_NOT_FOUND}`, () => {
		expect(constants.STATUS_CODE_NOT_FOUND).to.equal(STATUS_CODE_NOT_FOUND);
	});

	it(`COMMAND_RM_RF is equal to ${COMMAND_RM_RF}`, () => {
		expect(constants.COMMAND_RM_RF).to.equal(COMMAND_RM_RF);
	});

	it(`COMMAND_MKDIR is equal to ${COMMAND_MKDIR}`, () => {
		expect(constants.COMMAND_MKDIR).to.equal(COMMAND_MKDIR);
	});
});