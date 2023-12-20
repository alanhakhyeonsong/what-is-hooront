import { cloneDeep, isNull, isObject, isUndefined } from 'lodash-es';
import qs from 'qs';

import { PlanObject } from '@/types';

/**
 * 주어진 URL이 패턴과 일치하는지 확인합니다.
 * - 정확한 일치 (예: "/user/profile" === "/user/profile")의 경우 true를 반환합니다.
 * - 패턴 내의 와일드카드 세그먼트 (예: "/category/:categoryId/user/:userId")는 URL의 동일한 위치의 어떤 세그먼트와도 일치합니다.
 * @param pattern 와일드카드를 포함할 수 있는 URL 패턴입니다.
 * @param url 확인할 실제 URL입니다.
 * @returns URL이 패턴과 일치하면 true, 그렇지 않으면 false를 반환합니다.
 */
export const isMatchUrlToPattern = (pattern: string, url: string): boolean => {
  // 패턴과 URL을 '/'를 기준으로 분할합니다.
  const patternParts = pattern.split('/');
  const urlParts = url.split('/');

  // 세그먼트의 개수가 다르면 일치하지 않습니다.
  if (patternParts.length !== urlParts.length) return false;

  // 각 세그먼트를 순회하면서 패턴과 일치하는지 확인합니다.
  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i] !== urlParts[i] && !patternParts[i].startsWith(':')) {
      return false;
    }
  }

  return true;
};

/**
 * URL 쿼리스트링을 파싱한 객체를 반환합니다.
 * @param query 변환할 쿼리 문자열
 * @return 쿼리를 파싱한 결과 객체
 */
export const parseSearchString = (query: string) => qs.parse(query, { ignoreQueryPrefix: true });

/**
 * 제공된 폼 값들을 기반으로 URL 업데이트를 위한 새로운 쿼리 파라미터 객체 생성하여 반환합니다.
 * @param {FormFieldValues} fieldValues - 폼에서 검색된 값들.
 * @returns {FormFieldValues & { page: number }} `page` 속성을 1로 설정한 쿼리 파라미터 객체를 반환합니다.
 */
export const createUrlQueryParams = (fieldValues: PlanObject): PlanObject & { page: number } => {
  return cloneDeep({
    ...fieldValues,
    page: 1,
  });
};

/**
 * 객체에서 주어진 조건에 따라 값들을 제외하고 반환합니다.
 * 기본적으로 `null`, `undefined`, 빈 문자열(`emptyIgnore`가 true일 경우) 값을 가진 키를 제거합니다.
 * 중첩된 객체에 대해서도 재귀적으로 동일한 처리를 수행합니다.
 *
 * @example
 * omitObjectForUrl({ a: 'test', b: null, c: '', d: { e: null, f: 'valid' }, g: { h: null, i: null } });
 * 결과: { a: 'test', d: { f: 'valid' } }
 *
 * @param obj 처리할 객체
 * @param options 옵션 객체
 *
 * @returns {object} - 조건에 따라 값들이 제거된 새 객체
 */
export const sanitizeObjectForUrl = (
  obj: { [key: string]: unknown },
  { emptyIgnore = true }: { emptyIgnore?: boolean } = {}
): { [key: string]: unknown } => {
  const result = cloneDeep(obj);

  for (const key in result) {
    if (result.hasOwnProperty(key)) {
      const value: { [key: string]: unknown } | unknown = result[key];

      if (isNull(value) || isUndefined(value) || (value === '' && emptyIgnore)) {
        delete result[key];
      } else if (isObject(value)) {
        const sanitizedValue = sanitizeObjectForUrl(value as { [key: string]: unknown }, { emptyIgnore });
        if (Object.keys(sanitizedValue).length === 0) {
          delete result[key];
        } else {
          result[key] = sanitizedValue;
        }
      }
    }
  }

  return result;
};

/**
 * 주어진 객체를 기반으로 URL search 문자열을 생성합니다.
 * @description 변환할 대상 객체에 빈값 필드 또는 빈값을 가진 객체 필드는 제거됩니다.
 * @param obj 쿼리스트링으로 변환할 객체
 * @param option 옵션
 * @return 객체를 변환한 쿼리 문자열
 */
export const createSearchString = (obj: { [key: string]: unknown }, options: { encode?: boolean } = {}): string => {
  if (!('encode' in options)) {
    options.encode = false;
  }

  return qs.stringify(sanitizeObjectForUrl(obj), options);
};

/**
 * 주어진 검색 문자열에 페이지 번호를 추가하여 새로운 url search 문자열을 생성합니다.
 * @param search 현재의 검색 문자열.
 * @param page 설정하려는 페이지 번호.
 * @returns 페이지 번호가 추가된 새로운 검색 문자열을 반환합니다.
 */
export const appendPageToSearchString = (search: string, page: number): string =>
  createSearchString({
    ...parseSearchString(search),
    page,
  });
