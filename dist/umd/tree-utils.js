!function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define([], factory) : "object" == typeof exports ? exports.ReactSortableTree = factory() : root.ReactSortableTree = factory();
}(this, function() {
    return function(modules) {
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) return installedModules[moduleId].exports;
            var module = installedModules[moduleId] = {
                exports: {},
                id: moduleId,
                loaded: !1
            };
            return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
            module.loaded = !0, module.exports;
        }
        var installedModules = {};
        return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
        __webpack_require__.p = "", __webpack_require__(0);
    }([ function(module, exports) {
        "use strict";
        function _toConsumableArray(arr) {
            if (Array.isArray(arr)) {
                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
                return arr2;
            }
            return Array.from(arr);
        }
        function getNodeDataAtTreeIndexOrNextIndex(_ref) {
            var targetIndex = _ref.targetIndex, node = _ref.node, currentIndex = _ref.currentIndex, getNodeKey = _ref.getNodeKey, _ref$path = _ref.path, path = void 0 === _ref$path ? [] : _ref$path, _ref$lowerSiblingCoun = _ref.lowerSiblingCounts, lowerSiblingCounts = void 0 === _ref$lowerSiblingCoun ? [] : _ref$lowerSiblingCoun, _ref$ignoreCollapsed = _ref.ignoreCollapsed, ignoreCollapsed = void 0 === _ref$ignoreCollapsed || _ref$ignoreCollapsed, _ref$isPseudoRoot = _ref.isPseudoRoot, isPseudoRoot = void 0 !== _ref$isPseudoRoot && _ref$isPseudoRoot, selfPath = isPseudoRoot ? [] : [].concat(_toConsumableArray(path), [ getNodeKey({
                node: node,
                treeIndex: currentIndex
            }) ]);
            if (currentIndex === targetIndex) return {
                node: node,
                lowerSiblingCounts: lowerSiblingCounts,
                path: selfPath
            };
            if (!node.children || ignoreCollapsed && node.expanded !== !0) return {
                nextIndex: currentIndex + 1
            };
            for (var childIndex = currentIndex + 1, childCount = node.children.length, i = 0; i < childCount; i++) {
                var result = getNodeDataAtTreeIndexOrNextIndex({
                    ignoreCollapsed: ignoreCollapsed,
                    getNodeKey: getNodeKey,
                    targetIndex: targetIndex,
                    node: node.children[i],
                    currentIndex: childIndex,
                    lowerSiblingCounts: [].concat(_toConsumableArray(lowerSiblingCounts), [ childCount - i - 1 ]),
                    path: selfPath
                });
                if (result.node) return result;
                childIndex = result.nextIndex;
            }
            return {
                nextIndex: childIndex
            };
        }
        function getDescendantCount(_ref2) {
            var node = _ref2.node, _ref2$ignoreCollapsed = _ref2.ignoreCollapsed, ignoreCollapsed = void 0 === _ref2$ignoreCollapsed || _ref2$ignoreCollapsed;
            return getNodeDataAtTreeIndexOrNextIndex({
                getNodeKey: function() {},
                ignoreCollapsed: ignoreCollapsed,
                node: node,
                currentIndex: 0,
                targetIndex: -1
            }).nextIndex - 1;
        }
        function walkDescendants(_ref3) {
            var callback = _ref3.callback, getNodeKey = _ref3.getNodeKey, ignoreCollapsed = _ref3.ignoreCollapsed, _ref3$isPseudoRoot = _ref3.isPseudoRoot, isPseudoRoot = void 0 !== _ref3$isPseudoRoot && _ref3$isPseudoRoot, node = _ref3.node, currentIndex = _ref3.currentIndex, _ref3$path = _ref3.path, path = void 0 === _ref3$path ? [] : _ref3$path, _ref3$lowerSiblingCou = _ref3.lowerSiblingCounts, lowerSiblingCounts = void 0 === _ref3$lowerSiblingCou ? [] : _ref3$lowerSiblingCou, selfPath = isPseudoRoot ? [] : [].concat(_toConsumableArray(path), [ getNodeKey({
                node: node,
                treeIndex: currentIndex
            }) ]), selfInfo = isPseudoRoot ? null : {
                node: node,
                path: selfPath,
                lowerSiblingCounts: lowerSiblingCounts,
                treeIndex: currentIndex
            };
            if (!isPseudoRoot) {
                var callbackResult = callback(selfInfo);
                if (callbackResult === !1) return !1;
            }
            if (!node.children || node.expanded !== !0 && ignoreCollapsed && !isPseudoRoot) return currentIndex;
            var childIndex = currentIndex, childCount = node.children.length;
            if ("function" != typeof node.children) for (var i = 0; i < childCount; i++) if (childIndex = walkDescendants({
                callback: callback,
                getNodeKey: getNodeKey,
                ignoreCollapsed: ignoreCollapsed,
                node: node.children[i],
                currentIndex: childIndex + 1,
                lowerSiblingCounts: [].concat(_toConsumableArray(lowerSiblingCounts), [ childCount - i - 1 ]),
                path: selfPath
            }), childIndex === !1) return !1;
            return childIndex;
        }
        function mapDescendants(_ref4) {
            var callback = _ref4.callback, getNodeKey = _ref4.getNodeKey, ignoreCollapsed = _ref4.ignoreCollapsed, _ref4$isPseudoRoot = _ref4.isPseudoRoot, isPseudoRoot = void 0 !== _ref4$isPseudoRoot && _ref4$isPseudoRoot, node = _ref4.node, currentIndex = _ref4.currentIndex, _ref4$path = _ref4.path, path = void 0 === _ref4$path ? [] : _ref4$path, _ref4$lowerSiblingCou = _ref4.lowerSiblingCounts, lowerSiblingCounts = void 0 === _ref4$lowerSiblingCou ? [] : _ref4$lowerSiblingCou, selfPath = isPseudoRoot ? [] : [].concat(_toConsumableArray(path), [ getNodeKey({
                node: node,
                treeIndex: currentIndex
            }) ]), selfInfo = isPseudoRoot ? null : {
                node: node,
                path: selfPath,
                lowerSiblingCounts: lowerSiblingCounts,
                treeIndex: currentIndex
            };
            if (!node.children || node.expanded !== !0 && ignoreCollapsed && !isPseudoRoot) return {
                treeIndex: currentIndex,
                node: callback(selfInfo)
            };
            var childIndex = currentIndex, childCount = node.children.length, newChildren = node.children;
            return "function" != typeof newChildren && (newChildren = newChildren.map(function(child, i) {
                var mapResult = mapDescendants({
                    callback: callback,
                    getNodeKey: getNodeKey,
                    ignoreCollapsed: ignoreCollapsed,
                    node: child,
                    currentIndex: childIndex + 1,
                    lowerSiblingCounts: [].concat(_toConsumableArray(lowerSiblingCounts), [ childCount - i - 1 ]),
                    path: selfPath
                });
                return childIndex = mapResult.treeIndex, mapResult.node;
            })), {
                node: callback(_extends({}, selfInfo, {
                    node: _extends({}, node, {
                        children: newChildren
                    })
                })),
                treeIndex: childIndex
            };
        }
        function getVisibleNodeCount(_ref5) {
            var treeData = _ref5.treeData, traverse = function traverse(node) {
                return node.children && node.expanded === !0 && "function" != typeof node.children ? 1 + node.children.reduce(function(total, currentNode) {
                    return total + traverse(currentNode);
                }, 0) : 1;
            };
            return treeData.reduce(function(total, currentNode) {
                return total + traverse(currentNode);
            }, 0);
        }
        function getVisibleNodeInfoAtIndex(_ref6) {
            var treeData = _ref6.treeData, targetIndex = _ref6.index, getNodeKey = _ref6.getNodeKey;
            if (!treeData || treeData.length < 1) return null;
            var result = getNodeDataAtTreeIndexOrNextIndex({
                targetIndex: targetIndex,
                getNodeKey: getNodeKey,
                node: {
                    children: treeData,
                    expanded: !0
                },
                currentIndex: -1,
                path: [],
                lowerSiblingCounts: [],
                isPseudoRoot: !0
            });
            return result.node ? result : null;
        }
        function walk(_ref7) {
            var treeData = _ref7.treeData, getNodeKey = _ref7.getNodeKey, callback = _ref7.callback, _ref7$ignoreCollapsed = _ref7.ignoreCollapsed, ignoreCollapsed = void 0 === _ref7$ignoreCollapsed || _ref7$ignoreCollapsed;
            if (treeData && !(treeData.length < 1)) return walkDescendants({
                callback: callback,
                getNodeKey: getNodeKey,
                ignoreCollapsed: ignoreCollapsed,
                isPseudoRoot: !0,
                node: {
                    children: treeData
                },
                currentIndex: -1,
                path: [],
                lowerSiblingCounts: []
            });
        }
        function map(_ref8) {
            var treeData = _ref8.treeData, getNodeKey = _ref8.getNodeKey, callback = _ref8.callback, _ref8$ignoreCollapsed = _ref8.ignoreCollapsed, ignoreCollapsed = void 0 === _ref8$ignoreCollapsed || _ref8$ignoreCollapsed;
            return !treeData || treeData.length < 1 ? [] : mapDescendants({
                callback: callback,
                getNodeKey: getNodeKey,
                ignoreCollapsed: ignoreCollapsed,
                isPseudoRoot: !0,
                node: {
                    children: treeData
                },
                currentIndex: -1,
                path: [],
                lowerSiblingCounts: []
            }).node.children;
        }
        function toggleExpandedForAll(_ref9) {
            var treeData = _ref9.treeData, _ref9$expanded = _ref9.expanded, expanded = void 0 === _ref9$expanded || _ref9$expanded;
            return map({
                treeData: treeData,
                callback: function(_ref10) {
                    var node = _ref10.node;
                    return _extends({}, node, {
                        expanded: expanded
                    });
                },
                getNodeKey: function(_ref11) {
                    var treeIndex = _ref11.treeIndex;
                    return treeIndex;
                },
                ignoreCollapsed: !1
            });
        }
        function changeNodeAtPath(_ref12) {
            var treeData = _ref12.treeData, path = _ref12.path, newNode = _ref12.newNode, getNodeKey = _ref12.getNodeKey, _ref12$ignoreCollapse = _ref12.ignoreCollapsed, ignoreCollapsed = void 0 === _ref12$ignoreCollapse || _ref12$ignoreCollapse, RESULT_MISS = "RESULT_MISS", traverse = function traverse(_ref13) {
                var _ref13$isPseudoRoot = _ref13.isPseudoRoot, isPseudoRoot = void 0 !== _ref13$isPseudoRoot && _ref13$isPseudoRoot, node = _ref13.node, currentTreeIndex = _ref13.currentTreeIndex, pathIndex = _ref13.pathIndex;
                if (!isPseudoRoot && getNodeKey({
                    node: node,
                    treeIndex: currentTreeIndex
                }) !== path[pathIndex]) return RESULT_MISS;
                if (pathIndex >= path.length - 1) return "function" == typeof newNode ? newNode({
                    node: node,
                    treeIndex: currentTreeIndex
                }) : newNode;
                if (!node.children) throw new Error("Path referenced children of node with no children.");
                for (var nextTreeIndex = currentTreeIndex + 1, i = 0; i < node.children.length; i++) {
                    var _result = traverse({
                        node: node.children[i],
                        currentTreeIndex: nextTreeIndex,
                        pathIndex: pathIndex + 1
                    });
                    if (_result !== RESULT_MISS) return _result ? _extends({}, node, {
                        children: [].concat(_toConsumableArray(node.children.slice(0, i)), [ _result ], _toConsumableArray(node.children.slice(i + 1)))
                    }) : _extends({}, node, {
                        children: [].concat(_toConsumableArray(node.children.slice(0, i)), _toConsumableArray(node.children.slice(i + 1)))
                    });
                    nextTreeIndex += 1 + getDescendantCount({
                        node: node.children[i],
                        ignoreCollapsed: ignoreCollapsed
                    });
                }
                return RESULT_MISS;
            }, result = traverse({
                node: {
                    children: treeData
                },
                currentTreeIndex: -1,
                pathIndex: -1,
                isPseudoRoot: !0
            });
            if (result === RESULT_MISS) throw new Error("No node found at the given path.");
            return result.children;
        }
        function removeNodeAtPath(_ref14) {
            var treeData = _ref14.treeData, path = _ref14.path, getNodeKey = _ref14.getNodeKey, _ref14$ignoreCollapse = _ref14.ignoreCollapsed, ignoreCollapsed = void 0 === _ref14$ignoreCollapse || _ref14$ignoreCollapse;
            return changeNodeAtPath({
                treeData: treeData,
                path: path,
                getNodeKey: getNodeKey,
                ignoreCollapsed: ignoreCollapsed,
                newNode: null
            });
        }
        function getNodeAtPath(_ref15) {
            var treeData = _ref15.treeData, path = _ref15.path, getNodeKey = _ref15.getNodeKey, _ref15$ignoreCollapse = _ref15.ignoreCollapsed, ignoreCollapsed = void 0 === _ref15$ignoreCollapse || _ref15$ignoreCollapse, foundNodeInfo = null;
            try {
                changeNodeAtPath({
                    treeData: treeData,
                    path: path,
                    getNodeKey: getNodeKey,
                    ignoreCollapsed: ignoreCollapsed,
                    newNode: function(_ref16) {
                        var node = _ref16.node, treeIndex = _ref16.treeIndex;
                        return foundNodeInfo = {
                            node: node,
                            treeIndex: treeIndex
                        }, node;
                    }
                });
            } catch (err) {}
            return foundNodeInfo;
        }
        function addNodeUnderParent(_ref17) {
            var treeData = _ref17.treeData, newNode = _ref17.newNode, _ref17$parentKey = _ref17.parentKey, parentKey = void 0 === _ref17$parentKey ? null : _ref17$parentKey, getNodeKey = _ref17.getNodeKey, _ref17$ignoreCollapse = _ref17.ignoreCollapsed, ignoreCollapsed = void 0 === _ref17$ignoreCollapse || _ref17$ignoreCollapse, _ref17$expandParent = _ref17.expandParent, expandParent = void 0 !== _ref17$expandParent && _ref17$expandParent;
            if (null === parentKey) return {
                treeData: [].concat(_toConsumableArray(treeData || []), [ newNode ]),
                treeIndex: (treeData || []).length
            };
            var insertedTreeIndex = null, hasBeenAdded = !1, changedTreeData = map({
                treeData: treeData,
                getNodeKey: getNodeKey,
                ignoreCollapsed: ignoreCollapsed,
                callback: function(_ref18) {
                    var node = _ref18.node, treeIndex = _ref18.treeIndex, path = _ref18.path, key = path ? path[path.length - 1] : null;
                    if (hasBeenAdded || key !== parentKey) return node;
                    hasBeenAdded = !0;
                    var parentNode = _extends({}, node);
                    if (expandParent && (parentNode.expanded = !0), !parentNode.children) return insertedTreeIndex = treeIndex + 1, 
                    _extends({}, parentNode, {
                        children: [ newNode ]
                    });
                    if ("function" == typeof parentNode.children) throw new Error("Cannot add to children defined by a function");
                    for (var nextTreeIndex = treeIndex + 1, i = 0; i < parentNode.children.length; i++) nextTreeIndex += 1 + getDescendantCount({
                        node: parentNode.children[i],
                        ignoreCollapsed: ignoreCollapsed
                    });
                    return insertedTreeIndex = nextTreeIndex, _extends({}, parentNode, {
                        children: [].concat(_toConsumableArray(parentNode.children), [ newNode ])
                    });
                }
            });
            if (!hasBeenAdded) throw new Error("No node found with the given key.");
            return {
                treeData: changedTreeData,
                treeIndex: insertedTreeIndex
            };
        }
        function addNodeAtDepthAndIndex(_ref19) {
            var targetDepth = _ref19.targetDepth, minimumTreeIndex = _ref19.minimumTreeIndex, newNode = _ref19.newNode, ignoreCollapsed = _ref19.ignoreCollapsed, expandParent = _ref19.expandParent, _ref19$isPseudoRoot = _ref19.isPseudoRoot, isPseudoRoot = void 0 !== _ref19$isPseudoRoot && _ref19$isPseudoRoot, isLastChild = _ref19.isLastChild, node = _ref19.node, currentIndex = _ref19.currentIndex, currentDepth = _ref19.currentDepth, getNodeKey = _ref19.getNodeKey, _ref19$path = _ref19.path, path = void 0 === _ref19$path ? [] : _ref19$path, selfPath = function(n) {
                return isPseudoRoot ? [] : [].concat(_toConsumableArray(path), [ getNodeKey({
                    node: n,
                    treeIndex: currentIndex
                }) ]);
            };
            if (currentDepth === targetDepth) return {
                node: node,
                nextIndex: currentIndex + 1 + getDescendantCount({
                    node: node,
                    ignoreCollapsed: ignoreCollapsed
                })
            };
            if (currentIndex >= minimumTreeIndex - 1 || isLastChild && !node.children) {
                if ("function" == typeof node.children) throw new Error("Cannot add to children defined by a function");
                var extraNodeProps = expandParent ? {
                    expanded: !0
                } : {}, _nextNode = _extends({}, node, extraNodeProps, {
                    children: node.children ? [ newNode ].concat(_toConsumableArray(node.children)) : [ newNode ]
                });
                return {
                    node: _nextNode,
                    nextIndex: currentIndex + 2,
                    insertedTreeIndex: currentIndex + 1,
                    parentPath: selfPath(_nextNode)
                };
            }
            if (currentDepth === targetDepth - 1) {
                if (!node.children || "function" == typeof node.children || node.expanded !== !0 && ignoreCollapsed && !isPseudoRoot) return {
                    node: node,
                    nextIndex: currentIndex + 1
                };
                for (var _childIndex = currentIndex + 1, _insertedTreeIndex = null, insertIndex = null, i = 0; i < node.children.length; i++) {
                    if (_childIndex >= minimumTreeIndex) {
                        _insertedTreeIndex = _childIndex, insertIndex = i;
                        break;
                    }
                    _childIndex += 1 + getDescendantCount({
                        node: node.children[i],
                        ignoreCollapsed: ignoreCollapsed
                    });
                }
                if (null === insertIndex) {
                    if (_childIndex < minimumTreeIndex && !isLastChild) return {
                        node: node,
                        nextIndex: _childIndex
                    };
                    _insertedTreeIndex = _childIndex, insertIndex = node.children.length;
                }
                var _nextNode2 = _extends({}, node, {
                    children: [].concat(_toConsumableArray(node.children.slice(0, insertIndex)), [ newNode ], _toConsumableArray(node.children.slice(insertIndex)))
                });
                return {
                    node: _nextNode2,
                    nextIndex: _childIndex,
                    insertedTreeIndex: _insertedTreeIndex,
                    parentPath: selfPath(_nextNode2)
                };
            }
            if (!node.children || "function" == typeof node.children || node.expanded !== !0 && ignoreCollapsed && !isPseudoRoot) return {
                node: node,
                nextIndex: currentIndex + 1
            };
            var insertedTreeIndex = null, pathFragment = null, childIndex = currentIndex + 1, newChildren = node.children;
            "function" != typeof newChildren && (newChildren = newChildren.map(function(child, i) {
                if (null !== insertedTreeIndex) return child;
                var mapResult = addNodeAtDepthAndIndex({
                    targetDepth: targetDepth,
                    minimumTreeIndex: minimumTreeIndex,
                    newNode: newNode,
                    ignoreCollapsed: ignoreCollapsed,
                    expandParent: expandParent,
                    isLastChild: isLastChild && i === newChildren.length - 1,
                    node: child,
                    currentIndex: childIndex,
                    currentDepth: currentDepth + 1,
                    getNodeKey: getNodeKey,
                    path: []
                });
                return "insertedTreeIndex" in mapResult && (insertedTreeIndex = mapResult.insertedTreeIndex, 
                pathFragment = mapResult.parentPath), childIndex = mapResult.nextIndex, mapResult.node;
            }));
            var nextNode = _extends({}, node, {
                children: newChildren
            }), result = {
                node: nextNode,
                nextIndex: childIndex
            };
            return null !== insertedTreeIndex && (result.insertedTreeIndex = insertedTreeIndex, 
            result.parentPath = [].concat(_toConsumableArray(selfPath(nextNode)), _toConsumableArray(pathFragment))), 
            result;
        }
        function insertNode(_ref20) {
            var treeData = _ref20.treeData, targetDepth = _ref20.depth, minimumTreeIndex = _ref20.minimumTreeIndex, newNode = _ref20.newNode, _ref20$getNodeKey = _ref20.getNodeKey, getNodeKey = void 0 === _ref20$getNodeKey ? function() {} : _ref20$getNodeKey, _ref20$ignoreCollapse = _ref20.ignoreCollapsed, ignoreCollapsed = void 0 === _ref20$ignoreCollapse || _ref20$ignoreCollapse, _ref20$expandParent = _ref20.expandParent, expandParent = void 0 !== _ref20$expandParent && _ref20$expandParent;
            if (!treeData && 0 === targetDepth) return {
                treeData: [ newNode ],
                treeIndex: 0,
                path: [ getNodeKey({
                    node: newNode,
                    treeIndex: 0
                }) ]
            };
            var insertResult = addNodeAtDepthAndIndex({
                targetDepth: targetDepth,
                minimumTreeIndex: minimumTreeIndex,
                newNode: newNode,
                ignoreCollapsed: ignoreCollapsed,
                expandParent: expandParent,
                getNodeKey: getNodeKey,
                isPseudoRoot: !0,
                isLastChild: !0,
                node: {
                    children: treeData
                },
                currentIndex: -1,
                currentDepth: -1
            });
            if (!("insertedTreeIndex" in insertResult)) throw new Error("No suitable position found to insert.");
            var treeIndex = insertResult.insertedTreeIndex;
            return {
                treeData: insertResult.node.children,
                treeIndex: treeIndex,
                path: [].concat(_toConsumableArray(insertResult.parentPath), [ getNodeKey({
                    node: newNode,
                    treeIndex: treeIndex
                }) ])
            };
        }
        function getFlatDataFromTree(_ref21) {
            var treeData = _ref21.treeData, getNodeKey = _ref21.getNodeKey, _ref21$ignoreCollapse = _ref21.ignoreCollapsed, ignoreCollapsed = void 0 === _ref21$ignoreCollapse || _ref21$ignoreCollapse;
            if (!treeData || treeData.length < 1) return [];
            var flattened = [];
            return walk({
                treeData: treeData,
                getNodeKey: getNodeKey,
                ignoreCollapsed: ignoreCollapsed,
                callback: function(_ref22) {
                    var node = _ref22.node, lowerSiblingCounts = _ref22.lowerSiblingCounts, path = _ref22.path, treeIndex = _ref22.treeIndex;
                    flattened.push({
                        node: node,
                        lowerSiblingCounts: lowerSiblingCounts,
                        path: path,
                        treeIndex: treeIndex
                    });
                }
            }), flattened;
        }
        function getTreeFromFlatData(_ref23) {
            var flatData = _ref23.flatData, _ref23$getKey = _ref23.getKey, getKey = void 0 === _ref23$getKey ? function(node) {
                return node.id;
            } : _ref23$getKey, _ref23$getParentKey = _ref23.getParentKey, getParentKey = void 0 === _ref23$getParentKey ? function(node) {
                return node.parentId;
            } : _ref23$getParentKey, _ref23$rootKey = _ref23.rootKey, rootKey = void 0 === _ref23$rootKey ? "0" : _ref23$rootKey;
            if (!flatData) return [];
            var childrenToParents = {};
            if (flatData.forEach(function(child) {
                var parentKey = getParentKey(child);
                parentKey in childrenToParents ? childrenToParents[parentKey].push(child) : childrenToParents[parentKey] = [ child ];
            }), !(rootKey in childrenToParents)) return [];
            var trav = function trav(parent) {
                var parentKey = getKey(parent);
                return parentKey in childrenToParents ? _extends({}, parent, {
                    children: childrenToParents[parentKey].map(function(child) {
                        return trav(child);
                    })
                }) : _extends({}, parent);
            };
            return childrenToParents[rootKey].map(function(child) {
                return trav(child);
            });
        }
        function isDescendant(older, younger) {
            return !!older.children && "function" != typeof older.children && older.children.some(function(child) {
                return child === younger || isDescendant(child, younger);
            });
        }
        function getDepth(node) {
            var depth = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
            return node.children ? "function" == typeof node.children ? depth + 1 : node.children.reduce(function(deepest, child) {
                return Math.max(deepest, getDepth(child, depth + 1));
            }, depth) : depth;
        }
        function find(_ref24) {
            var getNodeKey = _ref24.getNodeKey, treeData = _ref24.treeData, searchQuery = _ref24.searchQuery, searchMethod = _ref24.searchMethod, searchFocusOffset = _ref24.searchFocusOffset, _ref24$expandAllMatch = _ref24.expandAllMatchPaths, expandAllMatchPaths = void 0 !== _ref24$expandAllMatch && _ref24$expandAllMatch, _ref24$expandFocusMat = _ref24.expandFocusMatchPaths, expandFocusMatchPaths = void 0 === _ref24$expandFocusMat || _ref24$expandFocusMat, matchCount = 0, trav = function trav(_ref25) {
                var _ref25$isPseudoRoot = _ref25.isPseudoRoot, isPseudoRoot = void 0 !== _ref25$isPseudoRoot && _ref25$isPseudoRoot, node = _ref25.node, currentIndex = _ref25.currentIndex, _ref25$path = _ref25.path, path = void 0 === _ref25$path ? [] : _ref25$path, matches = [], isSelfMatch = !1, hasFocusMatch = !1, selfPath = isPseudoRoot ? [] : [].concat(_toConsumableArray(path), [ getNodeKey({
                    node: node,
                    treeIndex: currentIndex
                }) ]), extraInfo = isPseudoRoot ? null : {
                    path: selfPath,
                    treeIndex: currentIndex
                }, hasChildren = node.children && "function" != typeof node.children && node.children.length > 0;
                !isPseudoRoot && searchMethod(_extends({}, extraInfo, {
                    node: node,
                    searchQuery: searchQuery
                })) && (matchCount === searchFocusOffset && (hasFocusMatch = !0), matchCount++, 
                isSelfMatch = !0);
                var childIndex = currentIndex, newNode = _extends({}, node);
                return hasChildren && (newNode.children = newNode.children.map(function(child) {
                    var mapResult = trav({
                        node: child,
                        currentIndex: childIndex + 1,
                        path: selfPath
                    });
                    return mapResult.node.expanded ? childIndex = mapResult.treeIndex : childIndex += 1, 
                    (mapResult.matches.length > 0 || mapResult.hasFocusMatch) && (matches = [].concat(_toConsumableArray(matches), _toConsumableArray(mapResult.matches)), 
                    mapResult.hasFocusMatch && (hasFocusMatch = !0), (expandAllMatchPaths && mapResult.matches.length > 0 || (expandAllMatchPaths || expandFocusMatchPaths) && mapResult.hasFocusMatch) && (newNode.expanded = !0)), 
                    mapResult.node;
                })), isPseudoRoot || newNode.expanded || (matches = matches.map(function(match) {
                    return _extends({}, match, {
                        treeIndex: null
                    });
                })), isSelfMatch && (matches = [ _extends({}, extraInfo, {
                    node: newNode
                }) ].concat(_toConsumableArray(matches))), {
                    node: matches.length > 0 ? newNode : node,
                    matches: matches,
                    hasFocusMatch: hasFocusMatch,
                    treeIndex: childIndex
                };
            }, result = trav({
                node: {
                    children: treeData
                },
                isPseudoRoot: !0,
                currentIndex: -1
            });
            return {
                matches: result.matches,
                treeData: result.node.children
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        };
        exports.getDescendantCount = getDescendantCount, exports.getVisibleNodeCount = getVisibleNodeCount, 
        exports.getVisibleNodeInfoAtIndex = getVisibleNodeInfoAtIndex, exports.walk = walk, 
        exports.map = map, exports.toggleExpandedForAll = toggleExpandedForAll, exports.changeNodeAtPath = changeNodeAtPath, 
        exports.removeNodeAtPath = removeNodeAtPath, exports.getNodeAtPath = getNodeAtPath, 
        exports.addNodeUnderParent = addNodeUnderParent, exports.insertNode = insertNode, 
        exports.getFlatDataFromTree = getFlatDataFromTree, exports.getTreeFromFlatData = getTreeFromFlatData, 
        exports.isDescendant = isDescendant, exports.getDepth = getDepth, exports.find = find;
    } ]);
});
//# sourceMappingURL=tree-utils.js.map