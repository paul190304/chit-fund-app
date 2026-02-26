'use strict';

/* ───────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────── */

const TEN_DIGITS = /^\d{10}$/;

function fail(res, message) {
  return res.status(400).json({ error: message });
}

/* ───────────────────────────────────────────────────────
   Month Creation Validation
───────────────────────────────────────────────────────── */

function validateCreateMonth(req, res, next) {
  let { monthLabel, bidAmount, payAmount } = req.body;

  // monthLabel validation
  if (typeof monthLabel !== 'string' || monthLabel.trim() === '') {
    return fail(res, 'monthLabel is required and must be a non-empty string');
  }

  // Normalize label
  monthLabel = monthLabel.trim();
  req.body.monthLabel = monthLabel;

  const hasBid = bidAmount !== undefined && bidAmount !== null;
  const hasPay = payAmount !== undefined && payAmount !== null;

  // Mutual exclusivity
  if (hasBid && hasPay) {
    return fail(res, 'Only one of bidAmount or payAmount is allowed');
  }

  if (!hasBid && !hasPay) {
    return fail(res, 'Either bidAmount or payAmount must be provided');
  }

  // Validate bidAmount
  if (hasBid) {
    if (typeof bidAmount !== 'number' || !Number.isFinite(bidAmount)) {
      return fail(res, 'bidAmount must be a valid number');
    }

    if (bidAmount < 20000) {
      return fail(res, 'bidAmount must be greater than or equal to 20000');
    }
  }

  // Validate payAmount
  if (hasPay) {
    if (typeof payAmount !== 'number' || !Number.isFinite(payAmount)) {
      return fail(res, 'payAmount must be a valid number');
    }

    if (payAmount <= 0 || payAmount > 25000) {
      return fail(res, 'payAmount must be greater than 0 and less than or equal to 25000');
    }
  }

  next();
}

/* ───────────────────────────────────────────────────────
   Member Creation Validation
───────────────────────────────────────────────────────── */

function validateCreateMember(req, res, next) {
  let { fullName, phone, whatsapp } = req.body;

  if (typeof fullName !== 'string' || fullName.trim() === '') {
    return fail(res, 'fullName is required and must be a non-empty string');
  }

  fullName = fullName.trim();
  req.body.fullName = fullName;

  if (typeof phone !== 'string') {
    return fail(res, 'phone is required and must be a string');
  }

  phone = phone.trim();

  if (!TEN_DIGITS.test(phone)) {
    return fail(res, 'phone must be exactly 10 digits');
  }

  req.body.phone = phone;

  if (typeof whatsapp !== 'string') {
    return fail(res, 'whatsapp is required and must be a string');
  }

  whatsapp = whatsapp.trim();

  if (!TEN_DIGITS.test(whatsapp)) {
    return fail(res, 'whatsapp must be exactly 10 digits');
  }

  req.body.whatsapp = whatsapp;

  next();
}

/* ───────────────────────────────────────────────────────
   Payment Validation
───────────────────────────────────────────────────────── */

function validateRecordPayment(req, res, next) {
  const { monthId, memberId, paymentMode } = req.body;

  if (!Number.isInteger(monthId) || monthId < 1) {
    return fail(res, 'monthId must be a positive integer');
  }

  if (!Number.isInteger(memberId) || memberId < 1) {
    return fail(res, 'memberId must be a positive integer');
  }

  if (typeof paymentMode !== 'string') {
    return fail(res, 'paymentMode is required');
  }

  if (!['CASH', 'ONLINE'].includes(paymentMode)) {
    return fail(res, 'paymentMode must be "CASH" or "ONLINE"');
  }

  next();
}

module.exports = {
  validateCreateMonth,
  validateCreateMember,
  validateRecordPayment,
};