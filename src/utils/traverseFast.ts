/**
 * Copyright (c) 2018, Matuzalém Teles.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {BaseNode} from '@babel/types';
import {Visitor, Visit} from '../global';
import * as t from '@babel/types';

function noop() {}

function getEnter<T>(handler: Visit<T> | undefined): Visit<T> {
	if (typeof handler === 'function') {
		return handler;
	}

	return noop;
}

export default function traverse(node: BaseNode, visitor: Visitor): void {
	if (!node) return;

	let handler = visitor[node.type];

	// @ts-ignore
	let keys = t.VISITOR_KEYS[node.type];
	if (!keys) return;

	let stop = getEnter(handler)(node);
	if (stop) return;

	for (let key of keys) {
		let subNode = (<any>node)[key];

		if (Array.isArray(subNode)) {
			for (let elementNode of subNode) {
				traverse(elementNode, visitor);
			}
		} else {
			traverse(subNode, visitor);
		}
	}
}
