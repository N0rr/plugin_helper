import _ from 'lodash';

const map = {};
const cache = {};

function writeInMap(componentName, ComponentClass) {
    if (componentName in map) {
        return;
    }

    map[componentName] = ComponentClass;
}

class Component {
    static initAll($context = $(document)) {
        for (let component in map) {
            if (!map.hasOwnProperty(component)) {
                continue;
            }

            $context.find(`.${component}`).each((ind, block) => {
                Component.get($(block), map[component]);
            });
        }
    }

    static get($block, ComponentClass) {
        $block = $block.eq(0);

        const name = ComponentClass.prototype._componentName;

        if (!$block.hasClass(name)) {
            const msg = `Данный элемент не является блоком ${name}`;
            console.error(msg);
            throw new Error(msg);
        }

        function createInstance() {
            const component = new ComponentClass($block);
            let id = $block.data('componentID');

            if (!component.$block) {
                component.$block = $block;
            }

            if (!cache[name]) {
                cache[name] = {};
            }

            if (!id) {
                id = _.uniqueId();
                $block.data('componentID', id);
            }

            cache[name][id] = component;
            return component;
        }

        function getFromCache() {
            const id = $block.data('componentID');
            let componentFromCache;

            if (id) {
                componentFromCache = cache[name][id];

                if (componentFromCache) {
                    return componentFromCache;
                }
            }

            return null;
        }

        if ($block.hasClass(`${name}_js_inited`)) {
            const componentFromCache = getFromCache();

            if (componentFromCache) {
                return componentFromCache;
            } else {
                return createInstance();
            }
        }

        $block.addClass(`${name}_js_inited`);
        return createInstance();
    }

    static create(componentName, ComponentClass) {
        const proto = Object.create(Component.prototype);

        Object.getOwnPropertyNames(ComponentClass.prototype).forEach(prop => {
            if (proto.hasOwnProperty(prop)) {
                return;
            }

            Object.defineProperty(
                proto,
                prop,
                Object.getOwnPropertyDescriptor(ComponentClass.prototype, prop));
        });

        ComponentClass.prototype = proto;

        Object.defineProperty(ComponentClass.prototype, '_componentName', {
            value: componentName
        });

        writeInMap(componentName, ComponentClass);

        return ComponentClass;
    }

    hasMod(mod, value) {
        if (typeof value !== 'undefined') {
            return this.$block.hasClass(`${this._componentName}_${mod}_${value}`);
        }

        return this.$block.attr('class').indexOf(`${this._componentName}_${mod}`) >= 0;
    }

    getModVal(mod) {
        if (!this.hasMod(mod)) {
            return null;
        }

        return this._getClassSubstring(this.$block, `${this._componentName}_${mod}_`);
    }

    setMod(mod, value) {
        const modString = typeof value !== 'undefined' ? `_${mod}_${value}` : `_${mod}`;

        if (this.hasMod(mod)) {
            let classes = this.$block.attr('class').split(/\s+/);

            classes = classes.map(className => {
                if (className.indexOf(`${this._componentName}_${mod}`) === -1) {
                    return className;
                }

                return `${this._componentName}${modString}`;
            });

            this.$block.attr('class', classes.join(' '));
        } else {
            this.$block.addClass(`${this._componentName}${modString}`);
        }

        return this;
    }

    delMod(mod) {
        if (!this.hasMod(mod)) {
            return;
        }

        let classes = this.$block.attr('class').split(/\s+/);

        classes = classes.filter(className => {
            return className.indexOf(`${this._componentName}_${mod}`) === -1;
        });

        this.$block.attr('class', classes.join(' '));

        return this;
    }

    toggleMod(mod) {
        if (this.hasMod(mod)) {
            this.delMod(mod);
        } else {
            this.setMod(mod);
        }
    }

    elem(name, mod, value) {
        let modString = '';

        if (typeof mod !== 'undefined') {
            modString += `_${mod}`;

            if (typeof value !== 'undefined') {
                modString += `_${value}`;
            }
        }

        return this.$block.find(`.${this._componentName}__${name}${modString}`);
    }

    elemSetMod(name, mod, value) {
        let $elem = this._validateElem(name);
        name = typeof name === 'string' ? name : this._getElemName($elem);

        this.setMod.apply(
            { $block: $elem, _componentName: `${this._componentName}__${name}`, hasMod: this.hasMod },
            [mod, value]
        );

        return this;
    }

    elemDelMod(name, mod) {
        let $elem = this._validateElem(name);
        name = typeof name === 'string' ? name : this._getElemName($elem);

        this.delMod.apply(
            { $block: $elem, _componentName: `${this._componentName}__${name}`, hasMod: this.hasMod },
            [mod]
        );

        return this;
    }

    elemHasMod(name, mod, value) {
        let $elem = this._validateElem(name);
        name = typeof name === 'string' ? name : this._getElemName($elem);

        return this.hasMod.apply(
            { $block: $elem, _componentName: `${this._componentName}__${name}` },
            [mod, value]
        );
    }
}

Object.defineProperties(Component.prototype, {
    _validateElem: {
        value(elem) {
            let $elem;

            if (typeof elem === 'string') {
                $elem = this.elem(elem);
            } else if (elem instanceof jQuery) {
                $elem = elem;
            } else {
                throw new Error('elem должен быть строкой или jQuery объектом');
            }

            return $elem;
        }
    },

    _getClassSubstring: {
        value($node, preffix) {
            const classes = $node.attr('class');
            const start = classes.indexOf(preffix) + preffix.length;
            const substr = classes.slice(start);
            let end = substr.search(/[ _]/ig);
            end = end === -1 ? substr.length : end;

            return substr.slice(0, end);
        }
    },

    _getElemName: {
        value($elem) {
            return this._getClassSubstring($elem, `${this._componentName}__`);
        }
    }
});

export default Component;
