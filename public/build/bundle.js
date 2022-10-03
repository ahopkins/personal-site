
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.46.2' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/elements/Hero.svelte generated by Svelte v3.46.2 */

    const file$8 = "src/elements/Hero.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (43:16) {#each social as item}
    function create_each_block$3(ctx) {
    	let a;
    	let i;
    	let t0;
    	let t1_value = /*item*/ ctx[1].text + "";
    	let t1;
    	let t2;

    	const block = {
    		c: function create() {
    			a = element("a");
    			i = element("i");
    			t0 = space();
    			t1 = text(t1_value);
    			t2 = space();
    			attr_dev(i, "class", "" + (null_to_empty(/*item*/ ctx[1].icon) + " svelte-foloil"));
    			add_location(i, file$8, 44, 24, 1440);
    			attr_dev(a, "href", /*item*/ ctx[1].url);
    			attr_dev(a, "target", "_blank");
    			add_location(a, file$8, 43, 20, 1380);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, i);
    			append_dev(a, t0);
    			append_dev(a, t1);
    			append_dev(a, t2);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(43:16) {#each social as item}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let section;
    	let div3;
    	let div1;
    	let h1;
    	let t1;
    	let p;
    	let i;
    	let t2;
    	let img0;
    	let img0_src_value;
    	let t3;
    	let img1;
    	let img1_src_value;
    	let t4;
    	let br0;
    	let t5;
    	let br1;
    	let t6;
    	let t7;
    	let div0;
    	let t8;
    	let div2;
    	let each_value = /*social*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			section = element("section");
    			div3 = element("div");
    			div1 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Adam Hopkins";
    			t1 = space();
    			p = element("p");
    			i = element("i");
    			t2 = text(" Python developer.\n                ");
    			img0 = element("img");
    			t3 = text("\n                OSS contributor.\n                ");
    			img1 = element("img");
    			t4 = text("\n                Sanic Maintainer. ");
    			br0 = element("br");
    			t5 = text("\n                Husband. Father. Son. Brother. ");
    			br1 = element("br");
    			t6 = text("\n                A proud and happy man.");
    			t7 = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t8 = space();
    			div2 = element("div");
    			attr_dev(h1, "class", "title is-size-1");
    			add_location(h1, file$8, 23, 12, 600);
    			attr_dev(i, "class", "devicon-python-plain colored");
    			add_location(i, file$8, 25, 16, 695);
    			if (!src_url_equal(img0.src, img0_src_value = "/images/osi.png")) attr_dev(img0, "src", img0_src_value);
    			set_style(img0, "height", "20px");
    			attr_dev(img0, "alt", "Open Source");
    			add_location(img0, file$8, 26, 16, 772);
    			if (!src_url_equal(img1.src, img1_src_value = "/images/sanic-framework-logo-circle-32x32.png")) attr_dev(img1, "src", img1_src_value);
    			set_style(img1, "height", "20px");
    			attr_dev(img1, "alt", "Sanic");
    			add_location(img1, file$8, 32, 16, 967);
    			add_location(br0, file$8, 37, 34, 1171);
    			add_location(br1, file$8, 38, 47, 1225);
    			attr_dev(p, "class", "subtitle");
    			add_location(p, file$8, 24, 12, 658);
    			attr_dev(div0, "class", "social");
    			add_location(div0, file$8, 41, 12, 1300);
    			attr_dev(div1, "class", "");
    			add_location(div1, file$8, 22, 8, 573);
    			attr_dev(div2, "class", "adam-avatar svelte-foloil");
    			add_location(div2, file$8, 50, 8, 1591);
    			attr_dev(div3, "class", "hero-body");
    			add_location(div3, file$8, 21, 4, 541);
    			attr_dev(section, "class", "hero is-black is-fullheight");
    			add_location(section, file$8, 20, 0, 491);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div3);
    			append_dev(div3, div1);
    			append_dev(div1, h1);
    			append_dev(div1, t1);
    			append_dev(div1, p);
    			append_dev(p, i);
    			append_dev(p, t2);
    			append_dev(p, img0);
    			append_dev(p, t3);
    			append_dev(p, img1);
    			append_dev(p, t4);
    			append_dev(p, br0);
    			append_dev(p, t5);
    			append_dev(p, br1);
    			append_dev(p, t6);
    			append_dev(div1, t7);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			append_dev(div3, t8);
    			append_dev(div3, div2);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*social*/ 1) {
    				each_value = /*social*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div0, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Hero', slots, []);

    	const social = [
    		{
    			url: "https://www.twitter.com/admhpkns",
    			text: "@admhpkns",
    			icon: "devicon-twitter-original"
    		},
    		{
    			url: "https://github.com/ahopkins",
    			text: "ahopkins",
    			icon: "devicon-github-original"
    		},
    		{
    			url: "https://linkedin.com/in/ahopkins",
    			text: "ahopkins",
    			icon: "devicon-linkedin-plain"
    		}
    	];

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Hero> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ social });
    	return [social];
    }

    class Hero extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Hero",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src/components/Section.svelte generated by Svelte v3.46.2 */

    const file$7 = "src/components/Section.svelte";

    function create_fragment$7(ctx) {
    	let section;
    	let h2;
    	let t0;
    	let t1;
    	let t2;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	const block = {
    		c: function create() {
    			section = element("section");
    			h2 = element("h2");
    			t0 = text("What I've ");
    			t1 = text(/*title*/ ctx[0]);
    			t2 = space();
    			if (default_slot) default_slot.c();
    			attr_dev(h2, "class", "title has-text-white-bis");
    			add_location(h2, file$7, 5, 4, 82);
    			attr_dev(section, "class", "section is-medium");
    			add_location(section, file$7, 4, 0, 42);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, h2);
    			append_dev(h2, t0);
    			append_dev(h2, t1);
    			append_dev(section, t2);

    			if (default_slot) {
    				default_slot.m(section, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*title*/ 1) set_data_dev(t1, /*title*/ ctx[0]);

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Section', slots, ['default']);
    	let { title } = $$props;
    	const writable_props = ['title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Section> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('$$scope' in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ title });

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title, $$scope, slots];
    }

    class Section extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { title: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Section",
    			options,
    			id: create_fragment$7.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*title*/ ctx[0] === undefined && !('title' in props)) {
    			console.warn("<Section> was created without expected prop 'title'");
    		}
    	}

    	get title() {
    		throw new Error("<Section>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Section>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function t(){}function e(t,e){for(const n in e)t[n]=e[n];return t}function n(t){return t()}function o(){return Object.create(null)}function r(t){t.forEach(n);}function l(t){return "function"==typeof t}function s(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function a(t,n,o,r){return t[1]&&r?e(o.ctx.slice(),t[1](r(n))):o.ctx}function c(t,e,n,o,r,l,s){const c=function(t,e,n,o){if(t[2]&&o){const r=t[2](o(n));if(void 0===e.dirty)return r;if("object"==typeof r){const t=[],n=Math.max(e.dirty.length,r.length);for(let o=0;o<n;o+=1)t[o]=e.dirty[o]|r[o];return t}return e.dirty|r}return e.dirty}(e,o,r,l);if(c){const r=a(e,n,o,s);t.p(r,c);}}function i(t,e){t.appendChild(e);}function u(t,e,n){t.insertBefore(e,n||null);}function d(t){t.parentNode.removeChild(t);}function m(t){return document.createElement(t)}function f(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function h(t){return document.createTextNode(t)}function v(){return h(" ")}function p(){return h("")}function g(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n);}function $(t,e){e=""+e,t.wholeText!==e&&(t.data=e);}function j(t,e,n,o){t.style.setProperty(e,n,o?"important":"");}let y;function k(t){y=t;}function b(){if(!y)throw new Error("Function called outside component initialization");return y}const x=[],q=[],w=[],_=[],E=Promise.resolve();let C=!1;function z(t){w.push(t);}let A=!1;const B=new Set;function N(){if(!A){A=!0;do{for(let t=0;t<x.length;t+=1){const e=x[t];k(e),F(e.$$);}for(k(null),x.length=0;q.length;)q.pop()();for(let t=0;t<w.length;t+=1){const e=w[t];B.has(e)||(B.add(e),e());}w.length=0;}while(x.length);for(;_.length;)_.pop()();C=!1,A=!1,B.clear();}}function F(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(z);}}const I=new Set;let L,M;function U(){L={r:0,c:[],p:L};}function S(){L.r||r(L.c),L=L.p;}function O(t,e){t&&t.i&&(I.delete(t),t.i(e));}function P(t,e,n,o){if(t&&t.o){if(I.has(t))return;I.add(t),L.c.push((()=>{I.delete(t),o&&(n&&t.d(1),o());})),t.o(e);}}function T(t,e){const n=e.token={};function o(t,o,r,l){if(e.token!==n)return;e.resolved=l;let s=e.ctx;void 0!==r&&(s=s.slice(),s[r]=l);const a=t&&(e.current=t)(s);let c=!1;e.block&&(e.blocks?e.blocks.forEach(((t,n)=>{n!==o&&t&&(U(),P(t,1,1,(()=>{e.blocks[n]===t&&(e.blocks[n]=null);})),S());})):e.block.d(1),a.c(),O(a,1),a.m(e.mount(),e.anchor),c=!0),e.block=a,e.blocks&&(e.blocks[o]=a),c&&N();}if((r=t)&&"object"==typeof r&&"function"==typeof r.then){const n=b();if(t.then((t=>{k(n),o(e.then,1,e.value,t),k(null);}),(t=>{if(k(n),o(e.catch,2,e.error,t),k(null),!e.hasCatch)throw t})),e.current!==e.pending)return o(e.pending,0),!0}else {if(e.current!==e.then)return o(e.then,1,e.value,t),!0;e.resolved=t;}var r;}function V(t){t&&t.c();}function H(t,e,o){const{fragment:s,on_mount:a,on_destroy:c,after_update:i}=t.$$;s&&s.m(e,o),z((()=>{const e=a.map(n).filter(l);c?c.push(...e):r(e),t.$$.on_mount=[];})),i.forEach(z);}function D(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[]);}function G(t,e){-1===t.$$.dirty[0]&&(x.push(t),C||(C=!0,E.then(N)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31;}function J(e,n,l,s,a,c,i=[-1]){const u=y;k(e);const m=e.$$={fragment:null,ctx:null,props:c,update:t,not_equal:a,bound:o(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:o(),dirty:i,skip_bound:!1};let f=!1;if(m.ctx=l?l(e,n.props||{},((t,n,...o)=>{const r=o.length?o[0]:n;return m.ctx&&a(m.ctx[t],m.ctx[t]=r)&&(!m.skip_bound&&m.bound[t]&&m.bound[t](r),f&&G(e,t)),n})):[],m.update(),f=!0,r(m.before_update),m.fragment=!!s&&s(m.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);m.fragment&&m.fragment.l(t),t.forEach(d);}else m.fragment&&m.fragment.c();n.intro&&O(e.$$.fragment),H(e,n.target,n.anchor),N();}k(u);}class K{$destroy(){D(this,1),this.$destroy=t;}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1);}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1);}}
    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */function Q(t,e,n,o){return new(n||(n=Promise))((function(r,l){function s(t){try{c(o.next(t));}catch(t){l(t);}}function a(t){try{c(o.throw(t));}catch(t){l(t);}}function c(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e);}))).then(s,a);}c((o=o.apply(t,e||[])).next());}))}function R(t){return Q(this,void 0,void 0,(function*(){const e=yield fetch(t);if(!e.ok)throw new Error(e.statusText);return e.json()}))}function W(t){return Q(this,void 0,void 0,(function*(){const e=yield function(){return Q(this,void 0,void 0,(function*(){return M||(M=yield R("https://raw.githubusercontent.com/ozh/github-colors/master/colors.json")),M}))}();let n={name:t.name,url:t.html_url,isFork:t.fork,stars:t.stargazers_count,forks:t.forks};return t.homepage&&(n.homepage=t.homepage),null!=t.description&&(n.description=t.description),null!=t.source&&(n.sourceName=t.source.full_name,n.sourceUrl=t.source.html_url),null!=t.language&&(n.language=t.language,n.langColor=e[t.language].color),n}))}function X(t){let e,n;const o=t[3].default,r=function(t,e,n,o){if(t){const r=a(t,e,n,o);return t[0](r)}}(o,t,t[2],null);return {c(){e=m("div"),r&&r.c(),g(e,"class","card svelte-qsnosv"),g(e,"style",t[0]);},m(t,o){u(t,e,o),r&&r.m(e,null),n=!0;},p(t,[l]){r&&r.p&&4&l&&c(r,o,t,t[2],l,null,null),(!n||1&l)&&g(e,"style",t[0]);},i(t){n||(O(r,t),n=!0);},o(t){P(r,t),n=!1;},d(t){t&&d(e),r&&r.d(t);}}}function Y(t,e,n){let o,{$$slots:r={},$$scope:l}=e,{theme:s}=e;return t.$$set=t=>{"theme"in t&&n(1,s=t.theme),"$$scope"in t&&n(2,l=t.$$scope);},t.$$.update=()=>{2&t.$$.dirty&&n(0,o=s&&[`--svc-text-primary: ${s.text}`,`--svc-text-link: ${s.link}`,`--svc-background: ${s.background}`,`--svc-border-color: ${s.border}`].join("; "));},[o,s,l,r]}class Z extends K{constructor(t){var e;super(),document.getElementById("svelte-qsnosv-style")||((e=m("style")).id="svelte-qsnosv-style",e.textContent=".card.svelte-qsnosv{font-family:-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;border:1px solid var(--svc-border-color, #e1e4e8);border-radius:6px;background:var(--svc-background, #fff);padding:1.25em;line-height:1.5;color:var(--svc-text-primary, #586069)}",i(document.head,e)),J(this,t,Y,X,s,{theme:1});}}function tt(e){let n,o;return {c(){n=f("svg"),o=f("path"),g(o,"fill-rule","evenodd"),g(o,"d","M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"),g(n,"viewBox","0 0 16 16"),g(n,"version","1.1"),g(n,"width","16"),g(n,"height","16"),g(n,"aria-hidden","true"),g(n,"class","svelte-13yojpf");},m(t,e){u(t,n,e),i(n,o);},p:t,i:t,o:t,d(t){t&&d(n);}}}class et extends K{constructor(t){var e;super(),document.getElementById("svelte-13yojpf-style")||((e=m("style")).id="svelte-13yojpf-style",e.textContent="svg.svelte-13yojpf{width:100%;height:auto}",i(document.head,e)),J(this,t,null,tt,s,{});}}function nt(e){let n,o;return {c(){n=f("svg"),o=f("path"),g(o,"fill-rule","evenodd"),g(o,"d","M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"),g(n,"aria-label","stars"),g(n,"viewBox","0 0 16 16"),g(n,"version","1.1"),g(n,"width","16"),g(n,"height","16"),g(n,"role","img"),g(n,"class","svelte-13yojpf");},m(t,e){u(t,n,e),i(n,o);},p:t,i:t,o:t,d(t){t&&d(n);}}}class ot extends K{constructor(t){var e;super(),document.getElementById("svelte-13yojpf-style")||((e=m("style")).id="svelte-13yojpf-style",e.textContent="svg.svelte-13yojpf{width:100%;height:auto}",i(document.head,e)),J(this,t,null,nt,s,{});}}function rt(e){let n,o;return {c(){n=f("svg"),o=f("path"),g(o,"fill-rule","evenodd"),g(o,"d","M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"),g(n,"aria-label","fork"),g(n,"viewBox","0 0 16 16"),g(n,"version","1.1"),g(n,"width","16"),g(n,"height","16"),g(n,"role","img"),g(n,"class","svelte-13yojpf");},m(t,e){u(t,n,e),i(n,o);},p:t,i:t,o:t,d(t){t&&d(n);}}}class lt extends K{constructor(t){var e;super(),document.getElementById("svelte-13yojpf-style")||((e=m("style")).id="svelte-13yojpf-style",e.textContent="svg.svelte-13yojpf{width:100%;height:auto}",i(document.head,e)),J(this,t,null,rt,s,{});}}function st(t){let e,n,o,r;return {c(){e=m("div"),n=h("Forked from "),o=m("a"),r=h(t[6]),g(o,"href",t[5]),g(o,"data-testid","fork-link"),g(o,"class","svelte-atqjmj"),g(e,"class","small svelte-atqjmj"),g(e,"data-testid","fork");},m(t,l){u(t,e,l),i(e,n),i(e,o),i(o,r);},p(t,e){64&e&&$(r,t[6]),32&e&&g(o,"href",t[5]);},d(t){t&&d(e);}}}function at(t){let e,n,o;return {c(){e=m("div"),n=m("a"),o=h(t[3]),g(n,"href",t[3]),g(n,"data-testid","homepage-link"),g(n,"class","svelte-atqjmj"),g(e,"class","homepage svelte-atqjmj"),g(e,"data-testid","homepage");},m(t,r){u(t,e,r),i(e,n),i(n,o);},p(t,e){8&e&&$(o,t[3]),8&e&&g(n,"href",t[3]);},d(t){t&&d(e);}}}function ct(t){let e,n;return {c(){e=m("div"),n=h(t[4]),g(e,"data-testid","description");},m(t,o){u(t,e,o),i(e,n);},p(t,e){16&e&&$(n,t[4]);},d(t){t&&d(e);}}}function it(t){let e,n,o,r,l;return {c(){e=m("div"),n=m("span"),o=v(),r=m("span"),l=h(t[7]),g(n,"class","lang-color svelte-atqjmj"),j(n,"background-color",t[8]),g(r,"data-testid","lang-name"),g(e,"class","lang svelte-atqjmj"),g(e,"data-testid","language");},m(t,s){u(t,e,s),i(e,n),i(e,o),i(e,r),i(r,l);},p(t,e){256&e&&j(n,"background-color",t[8]),128&e&&$(l,t[7]);},d(t){t&&d(e);}}}function ut(t){let e,n,o,r,l,s;return n=new ot({}),{c(){e=m("div"),V(n.$$.fragment),o=h("\n          "),r=m("span"),l=h(t[9]),g(r,"data-testid","star-count"),g(e,"class","icon-container svelte-atqjmj"),g(e,"data-testid","stars");},m(t,a){u(t,e,a),H(n,e,null),i(e,o),i(e,r),i(r,l),s=!0;},p(t,e){(!s||512&e)&&$(l,t[9]);},i(t){s||(O(n.$$.fragment,t),s=!0);},o(t){P(n.$$.fragment,t),s=!1;},d(t){t&&d(e),D(n);}}}function dt(t){let e,n,o,r,l,s;return n=new lt({}),{c(){e=m("div"),V(n.$$.fragment),o=h("\n          "),r=m("span"),l=h(t[10]),g(r,"data-testid","fork-count"),g(e,"class","icon-container svelte-atqjmj"),g(e,"data-testid","forks");},m(t,a){u(t,e,a),H(n,e,null),i(e,o),i(e,r),i(r,l),s=!0;},p(t,e){(!s||1024&e)&&$(l,t[10]);},i(t){s||(O(n.$$.fragment,t),s=!0);},o(t){P(n.$$.fragment,t),s=!1;},d(t){t&&d(e),D(n);}}}function mt(t){let e,n,o,r,l,s,a,c,f,p,j,y,k,b,x;r=new et({});let q=t[2]&&st(t),w=t[3]&&at(t),_=t[4]&&ct(t),E=t[7]&&it(t),C=t[9]>0&&ut(t),z=t[10]>0&&dt(t);return {c(){e=m("div"),n=m("div"),o=m("div"),V(r.$$.fragment),l=v(),s=m("a"),a=h(t[0]),c=v(),q&&q.c(),f=v(),w&&w.c(),p=v(),_&&_.c(),j=v(),y=m("div"),E&&E.c(),k=v(),C&&C.c(),b=v(),z&&z.c(),g(s,"href",t[1]),g(s,"data-testid","repo-name"),g(s,"class","svelte-atqjmj"),g(o,"class","name icon-container svelte-atqjmj"),g(n,"class","header svelte-atqjmj"),g(y,"class","meta small svelte-atqjmj"),g(e,"class","repo svelte-atqjmj");},m(t,d){u(t,e,d),i(e,n),i(n,o),H(r,o,null),i(o,l),i(o,s),i(s,a),i(n,c),q&&q.m(n,null),i(e,f),w&&w.m(e,null),i(e,p),_&&_.m(e,null),i(e,j),i(e,y),E&&E.m(y,null),i(y,k),C&&C.m(y,null),i(y,b),z&&z.m(y,null),x=!0;},p(t,[o]){(!x||1&o)&&$(a,t[0]),(!x||2&o)&&g(s,"href",t[1]),t[2]?q?q.p(t,o):(q=st(t),q.c(),q.m(n,null)):q&&(q.d(1),q=null),t[3]?w?w.p(t,o):(w=at(t),w.c(),w.m(e,p)):w&&(w.d(1),w=null),t[4]?_?_.p(t,o):(_=ct(t),_.c(),_.m(e,j)):_&&(_.d(1),_=null),t[7]?E?E.p(t,o):(E=it(t),E.c(),E.m(y,k)):E&&(E.d(1),E=null),t[9]>0?C?(C.p(t,o),512&o&&O(C,1)):(C=ut(t),C.c(),O(C,1),C.m(y,b)):C&&(U(),P(C,1,1,(()=>{C=null;})),S()),t[10]>0?z?(z.p(t,o),1024&o&&O(z,1)):(z=dt(t),z.c(),O(z,1),z.m(y,null)):z&&(U(),P(z,1,1,(()=>{z=null;})),S());},i(t){x||(O(r.$$.fragment,t),O(C),O(z),x=!0);},o(t){P(r.$$.fragment,t),P(C),P(z),x=!1;},d(t){t&&d(e),D(r),q&&q.d(),w&&w.d(),_&&_.d(),E&&E.d(),C&&C.d(),z&&z.d();}}}function ft(t,e,n){let{name:o}=e,{url:r}=e,{isFork:l}=e,{homepage:s}=e,{description:a}=e,{sourceUrl:c}=e,{sourceName:i}=e,{language:u}=e,{langColor:d}=e,{stars:m}=e,{forks:f}=e;return t.$$set=t=>{"name"in t&&n(0,o=t.name),"url"in t&&n(1,r=t.url),"isFork"in t&&n(2,l=t.isFork),"homepage"in t&&n(3,s=t.homepage),"description"in t&&n(4,a=t.description),"sourceUrl"in t&&n(5,c=t.sourceUrl),"sourceName"in t&&n(6,i=t.sourceName),"language"in t&&n(7,u=t.language),"langColor"in t&&n(8,d=t.langColor),"stars"in t&&n(9,m=t.stars),"forks"in t&&n(10,f=t.forks);},[o,r,l,s,a,c,i,u,d,m,f]}class ht extends K{constructor(t){var e;super(),document.getElementById("svelte-atqjmj-style")||((e=m("style")).id="svelte-atqjmj-style",e.textContent="a.svelte-atqjmj.svelte-atqjmj{text-decoration:none;color:inherit}a.svelte-atqjmj.svelte-atqjmj:hover{text-decoration:underline}.repo.svelte-atqjmj.svelte-atqjmj{text-align:start;color:var(--svc-text-primary, #586069);font-size:1em}.header.svelte-atqjmj.svelte-atqjmj{margin-bottom:0.6em}.name.svelte-atqjmj.svelte-atqjmj{font-weight:600;color:var(--svc-text-link, #0366d6)}.name.svelte-atqjmj a.svelte-atqjmj{margin-left:0.35em}.homepage.svelte-atqjmj.svelte-atqjmj{color:var(--svc-text-link, #0366d6)}.small.svelte-atqjmj.svelte-atqjmj{font-size:0.85em}.meta.svelte-atqjmj.svelte-atqjmj{display:flex;margin-top:0.6em}.meta.svelte-atqjmj>.svelte-atqjmj:not(:last-child){margin-right:1em}.meta.svelte-atqjmj .lang.svelte-atqjmj{position:relative}.meta.svelte-atqjmj .lang-color.svelte-atqjmj{position:relative;display:inline-block;width:1em;height:1em;bottom:-0.15em;border-radius:100%}.icon-container.svelte-atqjmj.svelte-atqjmj{display:flex;align-items:center}.icon-container.svelte-atqjmj svg{width:1em;fill:var(--svc-text-primary, #586069)}",i(document.head,e)),J(this,t,ft,mt,s,{name:0,url:1,isFork:2,homepage:3,description:4,sourceUrl:5,sourceName:6,language:7,langColor:8,stars:9,forks:10});}}function vt(e){let n,o,r,l,s,a,c,f=e[8]&&e[8].message&&pt(e);return {c(){n=m("span"),o=h("Failed to load card for "),r=m("a"),l=h(e[0]),s=h("."),a=v(),f&&f.c(),c=p(),g(r,"href",e[1]),g(r,"class","svelte-11cto6v"),g(n,"data-testid","failed");},m(t,e){u(t,n,e),i(n,o),i(n,r),i(r,l),i(n,s),u(t,a,e),f&&f.m(t,e),u(t,c,e);},p(t,e){1&e&&$(l,t[0]),2&e&&g(r,"href",t[1]),t[8]&&t[8].message?f?f.p(t,e):(f=pt(t),f.c(),f.m(c.parentNode,c)):f&&(f.d(1),f=null);},i:t,o:t,d(t){t&&d(n),t&&d(a),f&&f.d(t),t&&d(c);}}}function pt(t){let e,n,o=t[8].message+"";return {c(){e=m("span"),n=h(o),g(e,"data-testid","errmsg");},m(t,o){u(t,e,o),i(e,n);},p(t,e){4&e&&o!==(o=t[8].message+"")&&$(n,o);},d(t){t&&d(e);}}}function gt(t){let n,o;const r=[t[7]];let l={};for(let t=0;t<r.length;t+=1)l=e(l,r[t]);return n=new ht({props:l}),{c(){V(n.$$.fragment);},m(t,e){H(n,t,e),o=!0;},p(t,e){const o=4&e?function(t,e){const n={},o={},r={$$scope:1};let l=t.length;for(;l--;){const s=t[l],a=e[l];if(a){for(const t in s)t in a||(o[t]=1);for(const t in a)r[t]||(n[t]=a[t],r[t]=1);t[l]=a;}else for(const t in s)r[t]=1;}for(const t in o)t in n||(n[t]=void 0);return n}(r,[(l=t[7],"object"==typeof l&&null!==l?l:{})]):{};var l;n.$set(o);},i(t){o||(O(n.$$.fragment,t),o=!0);},o(t){P(n.$$.fragment,t),o=!1;},d(t){D(n,t);}}}function $t(e){let n,o,r,l,s;return {c(){n=m("span"),o=h("Loading card for "),r=m("a"),l=h(e[0]),s=h("..."),g(r,"href",e[1]),g(r,"class","svelte-11cto6v"),g(n,"data-testid","loading");},m(t,e){u(t,n,e),i(n,o),i(n,r),i(r,l),i(n,s);},p(t,e){1&e&&$(l,t[0]),2&e&&g(r,"href",t[1]);},i:t,o:t,d(t){t&&d(n);}}}function jt(t){let e,n,o,r={ctx:t,current:null,token:null,hasCatch:!0,pending:$t,then:gt,catch:vt,value:7,error:8,blocks:[,,,]};return T(n=t[2],r),{c(){e=p(),r.block.c();},m(t,n){u(t,e,n),r.block.m(t,r.anchor=n),r.mount=()=>e.parentNode,r.anchor=e,o=!0;},p(e,o){if(t=e,r.ctx=t,4&o&&n!==(n=t[2])&&T(n,r));else {const e=t.slice();e[7]=e[8]=r.resolved,r.block.p(e,o);}},i(t){o||(O(r.block),o=!0);},o(t){for(let t=0;t<3;t+=1){P(r.blocks[t]);}o=!1;},d(t){t&&d(e),r.block.d(t),r.token=null,r=null;}}}function yt(t){let e,n;return e=new Z({props:{theme:t[3],$$slots:{default:[jt]},$$scope:{ctx:t}}}),{c(){V(e.$$.fragment);},m(t,o){H(e,t,o),n=!0;},p(t,[n]){const o={};8&n&&(o.theme=t[3]),519&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o);},i(t){n||(O(e.$$.fragment,t),n=!0);},o(t){P(e.$$.fragment,t),n=!1;},d(t){D(e,t);}}}function kt(t,e,n){let o,r,l,{slug:s}=e;const a={text:"#586069",link:"#0366d6",background:"#ffffff",border:"#e1e4e8"},c={text:"#a09f9d",link:"#0366d6",background:"#000000",border:"#1e1b17"};let{theme:i}=e;return t.$$set=t=>{"slug"in t&&n(0,s=t.slug),"theme"in t&&n(4,i=t.theme);},t.$$.update=()=>{1&t.$$.dirty&&n(1,o=`https://github.com/${s}`),1&t.$$.dirty&&n(2,r=function(t){return Q(this,void 0,void 0,(function*(){const e=yield R(`https://api.github.com/repos/${t}`);return yield W(e)}))}(s)),16&t.$$.dirty&&n(3,l=(()=>{switch(i){case"light":return a;case"dark":return c;default:return i}})());},[s,o,r,l,i]}class RepoCard extends K{constructor(t){var e;super(),document.getElementById("svelte-11cto6v-style")||((e=m("style")).id="svelte-11cto6v-style",e.textContent="a.svelte-11cto6v{color:var(--svc-text-link, #0366d6)}",i(document.head,e)),J(this,t,kt,yt,s,{slug:0,theme:4});}}

    /* src/elements/Built.svelte generated by Svelte v3.46.2 */
    const file$6 = "src/elements/Built.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    // (33:12) {#each repos as slug}
    function create_each_block$2(ctx) {
    	let div;
    	let repocard;
    	let t;
    	let current;

    	repocard = new RepoCard({
    			props: {
    				slug: /*slug*/ ctx[2],
    				theme: /*theme*/ ctx[0]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(repocard.$$.fragment);
    			t = space();
    			attr_dev(div, "class", "tile is-child is-4 box svelte-1ocv4w7");
    			add_location(div, file$6, 33, 16, 828);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(repocard, div, null);
    			append_dev(div, t);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(repocard.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(repocard.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(repocard);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(33:12) {#each repos as slug}",
    		ctx
    	});

    	return block;
    }

    // (29:0) <Section title="Built">
    function create_default_slot$2(ctx) {
    	let div0;
    	let t1;
    	let div2;
    	let div1;
    	let current;
    	let each_value = /*repos*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			div0.textContent = "Some open source projects I maintain";
    			t1 = space();
    			div2 = element("div");
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "subtitle");
    			add_location(div0, file$6, 29, 4, 623);
    			attr_dev(div1, "class", "tile is-parent is-flex-wrap-wrap");
    			add_location(div1, file$6, 31, 8, 731);
    			attr_dev(div2, "class", "tile is-ancestor");
    			add_location(div2, file$6, 30, 4, 692);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*repos, theme*/ 3) {
    				each_value = /*repos*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div1, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div2);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(29:0) <Section title=\\\"Built\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let section;
    	let current;

    	section = new Section({
    			props: {
    				title: "Built",
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(section.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(section, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const section_changes = {};

    			if (dirty & /*$$scope*/ 32) {
    				section_changes.$$scope = { dirty, ctx };
    			}

    			section.$set(section_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(section.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(section.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(section, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Built', slots, []);

    	const theme = {
    		// The color of the text.
    		text: "#dbdbdb",
    		// The color of the links.
    		link: "#3273dc",
    		// The background color.
    		background: "#111111",
    		// The border color.
    		border: "#111111"
    	};

    	const repos = [
    		"sanic-org/sanic",
    		"sanic-org/sanic-ext",
    		"sanic-org/sanic-router",
    		"ahopkins/sanic-jwt",
    		"ahopkins/mayim",
    		"ahopkins/merkava"
    	];

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Built> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Section, RepoCard, theme, repos });
    	return [theme, repos];
    }

    class Built extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Built",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/elements/Done.svelte generated by Svelte v3.46.2 */
    const file$5 = "src/elements/Done.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (27:24) {#if position.current}
    function create_if_block(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = "🌟";
    			attr_dev(div, "class", "current svelte-1g99z0g");
    			add_location(div, file$5, 27, 28, 1051);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(27:24) {#if position.current}",
    		ctx
    	});

    	return block;
    }

    // (22:12) {#each work as position}
    function create_each_block$1(ctx) {
    	let div1;
    	let div0;
    	let strong;
    	let t0_value = /*position*/ ctx[1].title + "";
    	let t0;
    	let t1;
    	let t2_value = /*position*/ ctx[1].company + "";
    	let t2;
    	let t3;
    	let t4;
    	let if_block = /*position*/ ctx[1].current && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			strong = element("strong");
    			t0 = text(t0_value);
    			t1 = space();
    			t2 = text(t2_value);
    			t3 = space();
    			if (if_block) if_block.c();
    			t4 = space();
    			attr_dev(strong, "class", "svelte-1g99z0g");
    			add_location(strong, file$5, 24, 24, 899);
    			attr_dev(div0, "class", "content svelte-1g99z0g");
    			add_location(div0, file$5, 23, 20, 853);
    			attr_dev(div1, "class", "tile is-child is-4 box svelte-1g99z0g");
    			add_location(div1, file$5, 22, 16, 796);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, strong);
    			append_dev(strong, t0);
    			append_dev(div0, t1);
    			append_dev(div0, t2);
    			append_dev(div0, t3);
    			if (if_block) if_block.m(div0, null);
    			append_dev(div1, t4);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(22:12) {#each work as position}",
    		ctx
    	});

    	return block;
    }

    // (18:0) <Section title="Done">
    function create_default_slot$1(ctx) {
    	let div0;
    	let t1;
    	let div2;
    	let div1;
    	let each_value = /*work*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			div0.textContent = "Some roles I've had in the past";
    			t1 = space();
    			div2 = element("div");
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "subtitle");
    			add_location(div0, file$5, 18, 4, 593);
    			attr_dev(div1, "class", "tile is-parent is-flex-wrap-wrap");
    			add_location(div1, file$5, 20, 8, 696);
    			attr_dev(div2, "class", "tile is-ancestor");
    			add_location(div2, file$5, 19, 4, 657);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*work*/ 1) {
    				each_value = /*work*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div2);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(18:0) <Section title=\\\"Done\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let section;
    	let current;

    	section = new Section({
    			props: {
    				title: "Done",
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(section.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(section, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const section_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				section_changes.$$scope = { dirty, ctx };
    			}

    			section.$set(section_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(section.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(section.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(section, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Done', slots, []);

    	const work = [
    		{
    			title: "Director of Software Engineering",
    			company: "PacketFabric",
    			current: true
    		},
    		{
    			title: "Full Stack, Principal Engineer",
    			company: "Matrix Retail"
    		},
    		{ title: "CTO/CLO", company: "Optymizer" },
    		{ title: "Principal", company: "AHopLaw" },
    		{
    			title: "Associate Attorney",
    			company: "Looney & Grossman"
    		},
    		{
    			title: "Associate Attorney",
    			company: "Donovan | Hatem"
    		}
    	];

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Done> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Section, work });
    	return [work];
    }

    class Done extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Done",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src/elements/Said.svelte generated by Svelte v3.46.2 */
    const file$4 = "src/elements/Said.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    // (33:12) {#each repos as slug}
    function create_each_block(ctx) {
    	let div;
    	let repocard;
    	let t;
    	let current;

    	repocard = new RepoCard({
    			props: {
    				slug: /*slug*/ ctx[2],
    				theme: /*theme*/ ctx[0]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(repocard.$$.fragment);
    			t = space();
    			attr_dev(div, "class", "tile is-child is-4 box svelte-mbc480");
    			add_location(div, file$4, 33, 16, 892);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(repocard, div, null);
    			append_dev(div, t);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(repocard.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(repocard.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(repocard);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(33:12) {#each repos as slug}",
    		ctx
    	});

    	return block;
    }

    // (27:0) <Section title="Said">
    function create_default_slot(ctx) {
    	let div0;
    	let t1;
    	let div2;
    	let div1;
    	let current;
    	let each_value = /*repos*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			div0.textContent = "Some presentations I've given at tech conferences";
    			t1 = space();
    			div2 = element("div");
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "subtitle");
    			add_location(div0, file$4, 27, 4, 660);
    			attr_dev(div1, "class", "tile is-parent is-flex-wrap-wrap");
    			add_location(div1, file$4, 31, 8, 795);
    			attr_dev(div2, "class", "tile is-ancestor");
    			add_location(div2, file$4, 30, 4, 756);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*repos, theme*/ 3) {
    				each_value = /*repos*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div1, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div2);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(27:0) <Section title=\\\"Said\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let section;
    	let current;

    	section = new Section({
    			props: {
    				title: "Said",
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(section.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(section, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const section_changes = {};

    			if (dirty & /*$$scope*/ 32) {
    				section_changes.$$scope = { dirty, ctx };
    			}

    			section.$set(section_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(section.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(section.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(section, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Said', slots, []);

    	const theme = {
    		// The color of the text.
    		text: "#dbdbdb",
    		// The color of the links.
    		link: "#3273dc",
    		// The background color.
    		background: "#111111",
    		// The border color.
    		border: "#111111"
    	};

    	const repos = [
    		"ahopkins/europython2020-overcoming-access-control",
    		"ahopkins/pywebconf2021-making-sanic-even-faster",
    		"ahopkins/pyconil2021-liberate-your-api",
    		"ahopkins/pygeekle2022-mayim-byoq"
    	];

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Said> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Section, RepoCard, theme, repos });
    	return [theme, repos];
    }

    class Said extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Said",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/elements/Content.svelte generated by Svelte v3.46.2 */
    const file$3 = "src/elements/Content.svelte";

    function create_fragment$3(ctx) {
    	let div2;
    	let built;
    	let t0;
    	let div0;
    	let t1;
    	let said;
    	let t2;
    	let div1;
    	let t3;
    	let done;
    	let current;
    	built = new Built({ $$inline: true });
    	said = new Said({ $$inline: true });
    	done = new Done({ $$inline: true });

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			create_component(built.$$.fragment);
    			t0 = space();
    			div0 = element("div");
    			t1 = space();
    			create_component(said.$$.fragment);
    			t2 = space();
    			div1 = element("div");
    			t3 = space();
    			create_component(done.$$.fragment);
    			attr_dev(div0, "class", "is-divider svelte-pkt4u2");
    			attr_dev(div0, "data-content", "§");
    			add_location(div0, file$3, 8, 4, 212);
    			attr_dev(div1, "class", "is-divider svelte-pkt4u2");
    			attr_dev(div1, "data-content", "§");
    			add_location(div1, file$3, 10, 4, 273);
    			attr_dev(div2, "class", "has-background-black-ter has-text-white-ter");
    			add_location(div2, file$3, 6, 0, 136);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			mount_component(built, div2, null);
    			append_dev(div2, t0);
    			append_dev(div2, div0);
    			append_dev(div2, t1);
    			mount_component(said, div2, null);
    			append_dev(div2, t2);
    			append_dev(div2, div1);
    			append_dev(div2, t3);
    			mount_component(done, div2, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(built.$$.fragment, local);
    			transition_in(said.$$.fragment, local);
    			transition_in(done.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(built.$$.fragment, local);
    			transition_out(said.$$.fragment, local);
    			transition_out(done.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_component(built);
    			destroy_component(said);
    			destroy_component(done);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Content', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Content> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Built, Done, Said });
    	return [];
    }

    class Content extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Content",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/elements/Footer.svelte generated by Svelte v3.46.2 */

    const file$2 = "src/elements/Footer.svelte";

    function create_fragment$2(ctx) {
    	let footer;
    	let div;
    	let p;
    	let t0;
    	let a;
    	let t2;

    	const block = {
    		c: function create() {
    			footer = element("footer");
    			div = element("div");
    			p = element("p");
    			t0 = text("The source code is licensed\n            ");
    			a = element("a");
    			a.textContent = "MIT";
    			t2 = text(".\n            The website content is © 2022 by Adam Hopkins.");
    			attr_dev(a, "href", "http://opensource.org/licenses/mit-license.php");
    			add_location(a, file$2, 4, 12, 153);
    			add_location(p, file$2, 2, 8, 97);
    			attr_dev(div, "class", "content has-text-centered");
    			add_location(div, file$2, 1, 4, 49);
    			attr_dev(footer, "class", "footer has-background-black");
    			add_location(footer, file$2, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, footer, anchor);
    			append_dev(footer, div);
    			append_dev(div, p);
    			append_dev(p, t0);
    			append_dev(p, a);
    			append_dev(p, t2);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Footer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/elements/Book.svelte generated by Svelte v3.46.2 */

    const file$1 = "src/elements/Book.svelte";

    function create_fragment$1(ctx) {
    	let section;
    	let div1;
    	let div0;
    	let t0;
    	let a;
    	let t2;

    	const block = {
    		c: function create() {
    			section = element("section");
    			div1 = element("div");
    			div0 = element("div");
    			t0 = text("My book\n            ");
    			a = element("a");
    			a.textContent = "Python Web Development with Sanic";
    			t2 = text("\n            now available");
    			attr_dev(a, "href", "https://sanicbook.com");
    			attr_dev(a, "class", "svelte-gsari8");
    			add_location(a, file$1, 4, 12, 127);
    			attr_dev(div0, "class", "content is-size-2");
    			add_location(div0, file$1, 2, 8, 63);
    			attr_dev(div1, "class", "containter");
    			add_location(div1, file$1, 1, 4, 30);
    			attr_dev(section, "class", "section svelte-gsari8");
    			add_location(section, file$1, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div1);
    			append_dev(div1, div0);
    			append_dev(div0, t0);
    			append_dev(div0, a);
    			append_dev(div0, t2);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Book', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Book> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Book extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Book",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.46.2 */
    const file = "src/App.svelte";

    function create_fragment(ctx) {
    	let main;
    	let hero;
    	let t0;
    	let book;
    	let t1;
    	let content;
    	let t2;
    	let footer;
    	let current;
    	hero = new Hero({ $$inline: true });
    	book = new Book({ $$inline: true });
    	content = new Content({ $$inline: true });
    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(hero.$$.fragment);
    			t0 = space();
    			create_component(book.$$.fragment);
    			t1 = space();
    			create_component(content.$$.fragment);
    			t2 = space();
    			create_component(footer.$$.fragment);
    			add_location(main, file, 8, 0, 236);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(hero, main, null);
    			append_dev(main, t0);
    			mount_component(book, main, null);
    			append_dev(main, t1);
    			mount_component(content, main, null);
    			append_dev(main, t2);
    			mount_component(footer, main, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(hero.$$.fragment, local);
    			transition_in(book.$$.fragment, local);
    			transition_in(content.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(hero.$$.fragment, local);
    			transition_out(book.$$.fragment, local);
    			transition_out(content.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(hero);
    			destroy_component(book);
    			destroy_component(content);
    			destroy_component(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Hero, Content, Footer, Book });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
