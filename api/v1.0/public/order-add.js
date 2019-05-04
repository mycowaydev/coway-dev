
"use strict";

const config = require('../../../config');
const async = require('async');
const cloudinary = require('cloudinary');
const Order = require('../model/order');

module.exports = function (req, res) {
	/*cloudinary.config({
		cloud_name: config.CDN['NAME'],
		api_key: config.CDN['API_KEY'],
		api_secret: config.CDN['API_SECRET']
	});*/

	let data = getParam(req);
	let error = validateParam(req, data);

	if (error && error.length > 0) {
		let resp = config.getResponse(res, 200, error, {}, null);
		config.logApiCall(req, res, resp);
	} else {
		action(req, res, error, data);
	}
}

function getParam(req) {
	var data = {};

	data.id = req.body['id'];
	data.email_addr = req.body['email_addr'];
	data.status = req.body['status'];
	data.image_ic = req.body['image_ic'];
	data.image_card = req.body['image_card'];
	data.image_signature = req.body['image_signature'];
	data.phone_no = req.body['phone_no'];
	data.emergency_no = req.body['emergency_no'];
	data.address = req.body['address'];
	data.order_product = req.body['order_product'];
	data.order_date = config.getCurrentTimestamp();
	data.remarks = req.body['remarks'];

	return data;
}

function validateParam(req, data) {
	let error = [];

//    todo: add validation
//	if (config.isEmpty(data.key)) {
//		error.push(config.getErrorResponse('101A008', req));
//	}
//	if (config.isEmpty(data.value)) {
//		error.push(config.getErrorResponse('101A005', req));
//	}

	return error;
}

function action(req, res, error, data) {
	async.series(
		[
			function (callback) {
//			todo: wait for CK
//				if (typeof image !== 'undefined') {
//                    let tmpPath = image.path;
//                    let indexOfSeparator = tmpPath.lastIndexOf("/");
//                    if (indexOfSeparator <= 0) {
//                        indexOfSeparator = tmpPath.lastIndexOf("\\");
//                    }
//                    let indexOfDot = tmpPath.lastIndexOf(".");
//                    if (indexOfDot <= 0) {
//                        indexOfDot = tmpPath.length;
//                    }
//                    let filename = tmpPath.substring(indexOfSeparator + 1, tmpPath.length - (tmpPath.length - indexOfDot));
//                    cloudinary.v2.uploader.upload(tmpPath, { public_id: config.GLOBAL['APP_NAME'].toLowerCase() + '/order/' + filename }, function(err, result) {
//                        if (err) {
//                            error.push(config.getErrorResponse('101Z012', req));
//                            let resp = config.getResponse(res, 500, error, {}, err);
//                            config.logApiCall(req, res, resp);
//                            return callback(true);
//                        }
//                        imageUrl = result['secure_url'];
//                        return callback(null);
//                    });
//                } else {
//                    return callback(null);
//                }
                return callback(null);
			},
			function (callback) {
				let insertData = config.appendCommonFields(data, 'ORDER_ADD', 'user', false);
				Order.create(insertData, function (err, result) {
					if (err) {
						error.push(config.getErrorResponse('101Z012', req));
						let resp = config.getResponse(res, 500, error, {}, err);
						config.logApiCall(req, res, resp);
						return callback(true);
					}
					let resp = config.getResponse(res, 100, error, {});
					config.logApiCall(req, res, resp);
					return callback(null);
				});
			}
		]
	);
}