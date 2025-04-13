/* tslint:disable */
/* eslint-disable */
/**
 * 4차 프로젝트 7팀 API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */



/**
 * 알람 DTO
 * @export
 * @interface AlarmDTO
 */
export interface AlarmDTO {
    /**
     * 알람 ID
     * @type {number}
     * @memberof AlarmDTO
     */
    'id'?: number;
    /**
     * 받는 사용자 ID
     * @type {number}
     * @memberof AlarmDTO
     */
    'receiveMemberId': number;
    /**
     * 알람 내용
     * @type {string}
     * @memberof AlarmDTO
     */
    'content': string;
    /**
     * 알림 타입
     * @type {number}
     * @memberof AlarmDTO
     */
    'type': number;
    /**
     * 알림 확인
     * @type {boolean}
     * @memberof AlarmDTO
     */
    'checked'?: boolean;
    /**
     * 생성 날짜
     * @type {string}
     * @memberof AlarmDTO
     */
    'createdAt'?: string;
    /**
     * 
     * @type {number}
     * @memberof AlarmDTO
     */
    'destinationId': number;
}

