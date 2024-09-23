class ShortenedSperantClient {
  constructor({ id }) {
    this.id = id;
  }
}
class SperantClient {
  constructor({
    id,
    firstName,
    lastName,
    documentType,
    document,
    phone,
    mainTelephone,
    email,
    gender,
    coupleId,
    country,
    state,
    address,
    // optionals
    inputChannel,
    captationWay
  }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.documentType = documentType;
    this.document = document;
    this.phone = phone;
    this.mainTelephone = mainTelephone;
    this.email = email;
    this.gender = gender;
    this.coupleId = coupleId;
    this.country = country;
    this.state = state;
    this.address = address;
    // optionals
    this.inputChannel = inputChannel;
    this.captationWay = captationWay;
  }
}
class ShortenedSperantProject {
  constructor({ id, code, name }) {
    this.id = id;
    this.code = code;
    this.name = name;
  }
}
class SperantProject {
  constructor({
    id,
    code,
    name,
    projectType,
    propertyType,
    country,
    state,
    address
  }) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.projectType = projectType;
    this.propertyType = propertyType;
    this.country = country;
    this.state = state;
    this.address = address;
  }
}
class SperantBudget {
  constructor({
    id,
    code,
    projectId,
    contractNum,
    active,
    representerId,
    created_at,
    funding_type,
    expire_date
  }) {
    this.id = id;
    this.code = code;
    this.projectId = projectId;
    this.contractNum = contractNum;
    this.active = active;
    this.representerId = representerId;
    this.created_at = created_at;
    this.funding_type = funding_type;
    this.expire_date = expire_date;
  }
}
class SperantBank {
  constructor({
    id,
    name,
    icon,
    code,
    mapLink,
    manualLink
  }) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.code = code;
    this.mapLink = mapLink;
    this.manualLink = manualLink;
  }
}
class SperantUnit {
  constructor({
    id,
    code,
    name,
    commercialStatus,
  }) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.commercialStatus = commercialStatus;
  }
}
class SperantPayment {
  constructor({
    id,
    name,
    tag,
    formattedTag,
    amountPaid,
    formattedAmountPaid,
    saldo,
    formattedSaldo,
    active,
    status,
    expiresAt,
    formattedExpiresAt,
    depositAt,
    formattedDepositAt,
    schedule,
    bank,
    mora,
    formattedMora,
    currency
  }) {
    this.type = 'payments';
    this.id = id;
    this.name = name;
    this.tag = tag;
    this.formattedTag = formattedTag;
    this.amountPaid = amountPaid;
    this.formattedAmountPaid = formattedAmountPaid;
    this.saldo = saldo;
    this.formattedSaldo = formattedSaldo;
    this.active = active;
    this.status = status;
    this.expiresAt = expiresAt;
    this.formattedExpiresAt = formattedExpiresAt;
    this.depositAt = depositAt;
    this.formattedDepositAt = formattedDepositAt;
    this.schedule = schedule;
    this.bank = bank;
    this.mora = mora;
    this.formattedMora = formattedMora;
    this.currency = currency;
  }
}
class SperantQuota {
  constructor({
    id,
    code,
    tag,
    formattedTag,
    amount,
    formattedAmount,
    discount,
    formattedDiscount,
    saldo,
    formattedSaldo,
    status,
    expiresAt,
    formattedExpiresAt,
    depositAt,
    formattedDepositAt,
    schedule,
    bankId,
    bank,
    mora,
    formattedMora,
    currency
  }) {
    this.type = 'quotas';
    this.id = id;
    this.code = code;
    this.tag = tag;
    this.formattedTag = formattedTag;
    this.amount = amount;
    this.formattedAmount = formattedAmount;
    this.discount = discount;
    this.formattedDiscount = formattedDiscount;
    this.saldo = saldo;
    this.formattedSaldo = formattedSaldo;
    this.active = true;
    this.status = status;
    this.expiresAt = expiresAt;
    this.formattedExpiresAt = formattedExpiresAt;
    this.depositAt = depositAt;
    this.formattedDepositAt = formattedDepositAt;
    this.schedule = schedule;
    this.bankId = bankId;
    this.bank = bank;
    this.mora = mora;
    this.formattedMora = formattedMora;
    this.currency = currency;
  }
}
class SperantCIP {
  constructor({
    id,
    code,
    paymentId,
    paymentType,
    type,
    cip,
    cipUrl,
    payAmount,
    formattedPayAmount,
    paymentIn,
    expiresAt,
    formattedExpiresAt,
  }) {
    this.id = id;
    this.code = code;
    this.paymentType = paymentType;
    this.paymentId = paymentId;
    this.type = type;
    this.cip = cip;
    this.cipUrl = cipUrl;
    this.payAmount = payAmount;
    this.formattedPayAmount = formattedPayAmount;
    this.paymentIn = paymentIn;
    this.expiresAt = expiresAt;
    this.formattedExpiresAt = formattedExpiresAt;
  }
}
class SperantAttention {
  constructor({
    id,
    code,
    titularId,
    createdAt,
    attentionTypeId,
    statusAttentionId,
    originAttentionId,
    categoryAttentionId,
    creatorId,
    projectId,
    blockId,
    unitId,
    budgetId,
    detail,
    duration,
    attendantId,
    handingDate,
    expirationAt,
    origin,
    utmSource,
    observation,
  }) {
    this.id = id;
    this.code = code;
    this.titularId = titularId;
    this.createdAt = createdAt;
    this.attentionTypeId = attentionTypeId;
    this.statusAttentionId = statusAttentionId;
    this.originAttentionId = originAttentionId;
    this.categoryAttentionId = categoryAttentionId;
    this.creatorId = creatorId;
    this.projectId = projectId;
    this.blockId = blockId;
    this.unitId = unitId;
    this.budgetId = budgetId;
    this.detail = detail;
    this.duration = duration;
    this.attendantId = attendantId;
    this.handingDate = handingDate;
    this.expirationAt = expirationAt;
    this.origin = origin;
    this.utmSource = utmSource;
    this.observation = observation;
  }
}
class SperantTicket {
  constructor({
    _id,
    id,
    code,
    project,
    date,
    status,
    detail,
    category,
    type
  }) {
    this._id = _id;
    this.id = id;
    this.code = code;
    this.project = project;
    this.date = date;
    this.status = status;
    this.detail = detail;
    this.category = category;
    this.type = type;
  }
}
module.exports = {
  ShortenedSperantClient,
  SperantClient,
  ShortenedSperantProject,
  SperantProject,
  SperantBudget,
  SperantBank,
  SperantUnit,
  SperantPayment,
  SperantQuota,
  SperantCIP,
  SperantAttention,
  SperantTicket
};
