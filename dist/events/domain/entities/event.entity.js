"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSchema = exports.Event = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const uuid_1 = require("uuid");
const event_modality_enum_1 = require("../enums/event-modality.enum");
let Event = class Event {
    uuid;
    name;
    description;
    address;
    mapUrl;
    date;
    modality;
    cancellationPolicy;
    participantEditionPolicy;
    ticketType;
    ticketPrice;
    ticketQuantity;
};
exports.Event = Event;
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: uuid_1.v4 }),
    __metadata("design:type", String)
], Event.prototype, "uuid", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Event.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Event.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Event.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Event.prototype, "mapUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Event.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: event_modality_enum_1.EventModality }),
    __metadata("design:type", String)
], Event.prototype, "modality", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Event.prototype, "cancellationPolicy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Event.prototype, "participantEditionPolicy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 'padrão', trim: true }),
    __metadata("design:type", String)
], Event.prototype, "ticketType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Event.prototype, "ticketPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Event.prototype, "ticketQuantity", void 0);
exports.Event = Event = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Event);
exports.EventSchema = mongoose_1.SchemaFactory.createForClass(Event);
//# sourceMappingURL=event.entity.js.map