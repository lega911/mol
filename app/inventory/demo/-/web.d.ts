declare namespace $ {
    function $mol_log(path: string, values: any[]): void;
    namespace $mol_log {
        function filter(next?: string): string;
    }
}
declare namespace $ {
    class $mol_object {
        Class(): any;
        static toString(): string;
        private 'object_owner()';
        object_owner(next?: Object): Object;
        private 'object_field()';
        object_field(next?: string): string;
        toString(): string;
        setup(script: (obj: this) => void): this;
        'destroyed()': boolean;
        destroyed(next?: boolean): boolean;
        log(values: any[]): void;
    }
}
declare namespace $ {
    class $mol_set<Value> {
        size: number;
        add(key: Value): this;
        delete(key: Value): void;
        has(key: Value): boolean;
        clear(): void;
        keys(): Value[];
        values(): Value[];
        entries(): [Value, Value][];
        forEach(handler: (key: Value, value: Value) => void): void;
    }
    class $mol_set_shim<Value> implements $mol_set<Value> {
        _index: {
            [index: string]: Value[];
        };
        size: number;
        add(value: Value): this;
        has(value: Value): boolean;
        delete(value: Value): void;
        forEach(handle: (val: Value, key: Value) => void): void;
        keys(): Value[];
        values(): Value[];
        entries(): [Value, Value][];
        clear(): void;
    }
}
declare namespace $ {
    class $mol_defer extends $mol_object {
        run: () => void;
        constructor(run: () => void);
        destroyed(next?: boolean): boolean;
        static all: $mol_defer[];
        static timer: number;
        static scheduleNative: (handler: () => void) => number;
        static schedule(): void;
        static unschedule(): void;
        static add(defer: $mol_defer): void;
        static drop(defer: $mol_defer): void;
        static run(): void;
    }
}
declare namespace $ {
    class $mol_dict<Key, Value> {
        size: number;
        get(key: Key): Value;
        set(key: Key, value: Value): this;
        delete(key: Key): void;
        has(key: Key): boolean;
        clear(): void;
        keys(): Key[];
        values(): Value[];
        entries(): [Key, Value][];
        forEach(handler: (value: Value, key: Key) => void): void;
    }
    class $mol_dict_shim<Key, Value> implements $mol_dict<Key, Value> {
        _keys: {
            [index: string]: Key[];
        };
        _values: {
            [index: string]: Value[];
        };
        size: number;
        set(key: Key, value: Value): this;
        get(key: Key): Value;
        has(key: Key): boolean;
        delete(key: Key): void;
        forEach(handle: (val: Value, key: Key) => void): void;
        keys(): Key[];
        values(): Value[];
        entries(): [Key, Value][];
        clear(): void;
    }
}
declare namespace $ {
    var $mol_state_stack: $mol_dict<string, any>;
}
declare var Proxy: any;
declare namespace $ {
    enum $mol_atom_status {
        obsolete,
        checking,
        pulling,
        actual,
    }
    class $mol_atom<Value> extends $mol_object {
        masters: $mol_set<$mol_atom<any>>;
        slaves: $mol_set<$mol_atom<any>>;
        status: $mol_atom_status;
        autoFresh: boolean;
        handler: (next?: Value | Error, force?: $mol_atom_force) => Value;
        host: {
            [key: string]: any;
        };
        field: string;
        constructor(host: any, handler: (next?: Value | Error, force?: $mol_atom_force) => Value, field?: string);
        destroyed(next?: boolean): boolean;
        unlink(): void;
        toString(): string;
        get(force?: $mol_atom_force): Value;
        actualize(force?: $mol_atom_force): void;
        pull(force?: $mol_atom_force): any;
        _next: Value | Error;
        set(next: Value): Value;
        normalize(next: Value, prev: Value | Error): Value;
        push(next_raw: Value | Error): any;
        obsolete_slaves(): void;
        check_slaves(): void;
        check(): void;
        obsolete(): Value;
        lead(slave: $mol_atom<any>): void;
        dislead(slave: $mol_atom<any>): void;
        obey(master: $mol_atom<any>): void;
        disobey(master: $mol_atom<any>): void;
        disobey_all(): void;
        value(next?: Value, force?: $mol_atom_force): any;
        static stack: $mol_atom<any>[];
        static updating: $mol_atom<any>[];
        static reaping: $mol_set<$mol_atom<any>>;
        static scheduled: boolean;
        static actualize(atom: $mol_atom<any>): void;
        static reap(atom: $mol_atom<any>): void;
        static unreap(atom: $mol_atom<any>): void;
        static schedule(): void;
        static sync(): void;
    }
    class $mol_atom_wait extends Error {
        message: string;
        name: string;
        constructor(message?: string);
    }
    class $mol_atom_force extends Object {
        $mol_atom_force: boolean;
        static $mol_atom_force: boolean;
    }
    function $mol_atom_task<Value>(host: any, handler: () => Value): $mol_atom<any>;
}
declare namespace $ {
    function $mol_mem<Host, Value>(config?: {
        lazy?: boolean;
    }): (obj: Host, name: string, descr: TypedPropertyDescriptor<(next?: Value, force?: $mol_atom_force) => Value>) => void;
    function $mol_mem_key<Host, Key, Value>(config?: {
        lazy?: boolean;
    }): (obj: Host, name: string, descr: TypedPropertyDescriptor<(key: Key, next?: Value, force?: $mol_atom_force) => Value>) => void;
}
declare namespace $ {
    class $mol_window extends $mol_object {
        static size(next?: {
            width: number;
            height: number;
        }): {
            width: number;
            height: number;
        };
    }
}
declare namespace $ {
    var $mol_dom_context: Window & {
        Node: typeof Node;
        Element: typeof Element;
        HTMLElement: typeof HTMLElement;
        XMLHttpRequest: typeof XMLHttpRequest;
    };
}
declare namespace $ {
}
declare namespace $ {
    let $mol_view_context: $mol_view_context;
    interface $mol_view_context {
        $mol_view_visible_width(): number;
        $mol_view_visible_height(): number;
        $mol_view_state_key(suffix: string): string;
    }
    class $mol_view extends $mol_object {
        static Root(id: number): $mol_view;
        title(): string;
        focused(next?: boolean): boolean;
        context(next?: $mol_view_context): $mol_view_context;
        context_sub(): $mol_view_context;
        state_key(suffix?: string): string;
        dom_name(): string;
        dom_name_space(): string;
        sub(): (string | number | boolean | Node | $mol_view)[];
        sub_visible(): (string | number | boolean | Node | $mol_view)[];
        minimal_width(): number;
        minimal_height(): number;
        private 'dom_node()';
        dom_node(next?: Element): Element;
        static bind_event(node: Element, events: {
            [key: string]: (event: Event) => void;
        }): void;
        static render_sub(node: Element, sub: ($mol_view | Node | string | number | boolean)[]): void;
        static render_attr(node: Element, attrs: {
            [key: string]: string | number | boolean;
        }): void;
        static render_style(node: HTMLElement, styles: {
            [key: string]: string | number;
        }): void;
        static render_field(node: any, field: {
            [key: string]: any;
        }): void;
        dom_tree(): HTMLElement;
        attr(): {
            [key: string]: string | number | boolean;
        };
        style(): {
            [key: string]: string | number;
        };
        field(): {
            [key: string]: any;
        };
        event(): {
            [key: string]: (event: Event) => void;
        };
        locale_contexts(): string[];
    }
}
interface Window {
    cordova: any;
}
declare namespace $ {
}
declare namespace $ {
    class $mol_view_selection extends $mol_object {
        static focused(next?: Element[], force?: $mol_atom_force): Element[];
        static position(...diff: any[]): any;
        static onFocus(event: FocusEvent): void;
        static onBlur(event: FocusEvent): void;
    }
}
declare namespace $ {
}
declare namespace $ {
    function $mol_merge_dict<Target, Source>(target: Target, source: Source): Target & Source;
}
declare namespace $ {
    class $mol_state_arg<Value> extends $mol_object {
        prefix: string;
        static href(next?: string): string;
        static dict(next?: {
            [key: string]: string;
        }): {
            [key: string]: string;
        };
        static value(key: string, next?: string): string;
        static link(next: {
            [key: string]: string;
        }): string;
        static make(next: {
            [key: string]: string;
        }): string;
        constructor(prefix?: string);
        value(key: string, next?: string): string;
        sub(postfix: string): $mol_state_arg<{}>;
        link(next: {
            [key: string]: string;
        }): string;
    }
}
declare namespace $ {
    class $mol_link extends $mol_view {
        minimal_height(): number;
        dom_name(): string;
        uri(): string;
        current(): boolean;
        attr(): {
            "href": any;
            "mol_link_current": any;
        };
        arg(): {};
    }
}
declare namespace $.$mol {
    class $mol_link extends $.$mol_link {
        uri(): string;
        current(): boolean;
    }
}
declare namespace $ {
    class $mol_http_request extends $mol_object {
        uri(): string;
        method(): string;
        credentials(): {
            login?: string;
            password?: string;
        };
        body(): any;
        'native()': XMLHttpRequest;
        native(): XMLHttpRequest;
        destroyed(next?: boolean): boolean;
        response(next?: any, force?: $mol_atom_force): any;
        text(next?: string, force?: $mol_atom_force): string;
    }
}
declare namespace $ {
    class $mol_http_resource extends $mol_object {
        static item(uri: string): $mol_http_resource;
        uri(): string;
        credentials(): {
            login?: string;
            password?: string;
        };
        request(): $mol_http_request;
        text(next?: string, force?: $mol_atom_force): string;
    }
    class $mol_http_resource_json<Content> extends $mol_http_resource {
        static item<Content>(uri: string): $mol_http_resource_json<Content>;
        json(next?: Content, force?: $mol_atom_force): Content;
    }
}
declare namespace $ {
    function $mol_const<Value>(value: Value): {
        (): Value;
        '()': Value;
    };
}
declare var hhfw: any;
declare var sqlitePlugin: any;
declare namespace $ {
    class $mol_hyperhive extends $mol_object {
        static initialize(params: {
            host: string;
            version: string;
            environment: string;
            project: string;
            application: string;
        }): typeof $mol_hyperhive;
        static authentificated(credentials: {
            login: string;
            password: string;
        }, next?: boolean, force?: $mol_atom_force): boolean;
        static data<Value>(resource: {
            uri: string;
            table: string;
        }, next?: any, force?: $mol_atom_force): Value;
    }
}
declare namespace $ {
    class $mol_state_session<Value> extends $mol_object {
        static value<Value>(key: string, next?: Value): Value;
        prefix(): string;
        value(key: string, next?: Value): Value;
    }
}
declare namespace $ {
    const $mol_app_inventory_domain_position_status: {
        draft: string;
        approved: string;
        completed: string;
        pending: string;
        rejected: string;
    };
    interface $mol_app_inventory_domain_product_raw {
        R_MATERIAL_ID: string;
        R_BARCODE: string;
        R_NAME: string;
    }
    interface $mol_app_inventory_domain_position_raw {
        R_MOVEMENT_ID: string;
        R_MATERIAL_ID: string;
        R_QUANTITY: number;
        R_COMMENT: string;
        R_STATUS: typeof $mol_app_inventory_domain_position_status[keyof typeof $mol_app_inventory_domain_position_status];
    }
    class $mol_app_inventory_domain extends $mol_object {
        table<Row>(name: string, next?: Row[]): Row[];
        products_table(): $mol_app_inventory_domain_product_raw[];
        positions_table(next?: $mol_app_inventory_domain_position_raw[]): $mol_app_inventory_domain_position_raw[];
        product_rows_by_id(): {
            [code: string]: $mol_app_inventory_domain_product_raw;
        };
        product_by_code(code: string): $mol_app_inventory_domain_product;
        product_rows_by_code(): {
            [code: string]: $mol_app_inventory_domain_product_raw;
        };
        position_rows_by_id(): {
            [code: string]: $mol_app_inventory_domain_position_raw;
        };
        products(): $mol_app_inventory_domain_product[];
        product(id: string): $mol_app_inventory_domain_product;
        product_code(id: string): string;
        product_title(id: string): string;
        positions(next?: $mol_app_inventory_domain_position[]): $mol_app_inventory_domain_position[];
        positions_by_product_id(): {
            [code: string]: $mol_app_inventory_domain_position;
        };
        position_by_product_id(product_id: string): $mol_app_inventory_domain_position;
        position(id: string): $mol_app_inventory_domain_position;
        position_product(id: string, next?: $mol_app_inventory_domain_product): $mol_app_inventory_domain_product;
        position_count(id: string, next?: number): number;
        position_status(id: string, next?: keyof typeof $mol_app_inventory_domain_position_status): any;
        credentials(next?: {
            login: string;
            password: string;
        }): {
            login: string;
            password: string;
        };
        authentificated(): boolean;
        can_write_off(): boolean;
        can_approve(): boolean;
        message(): string;
    }
    class $mol_app_inventory_domain_product extends $mol_object {
        id(): string;
        code(): string;
        title(): string;
        description(): string;
    }
    class $mol_app_inventory_domain_position extends $mol_object {
        id(): string;
        product(): $mol_app_inventory_domain_product;
        count(next?: number): number;
        status(next?: keyof typeof $mol_app_inventory_domain_position_status): "draft" | "approved" | "completed" | "pending" | "rejected";
        remark(next?: string): string;
    }
}
declare var localStorage: Storage;
declare namespace $ {
    class $mol_state_local<Value> extends $mol_object {
        static value<Value>(key: string, next?: Value, force?: $mol_atom_force): Value;
        prefix(): string;
        value(key: string, next?: Value): Value;
    }
}
declare namespace $ {
}
declare namespace $ {
    class $mol_file extends $mol_object {
        static absolute(path: string): $mol_file;
        static relative(path: string): $mol_file;
        path(): string;
        parent(): $mol_file;
        name(): string;
        ext(): string;
        content(next?: string, force?: $mol_atom_force): string;
        resolve(path: string): $mol_file;
        relate(base?: any): void;
    }
}
declare namespace $ {
    interface $mol_locale_dict {
        [key: string]: string;
    }
    class $mol_locale extends $mol_object {
        static lang(next?: string): string;
        static texts(next?: $mol_locale_dict): $mol_locale_dict;
        static text(contexts: string[], key: string): string;
    }
}
declare namespace $ {
    class $mol_string extends $mol_view {
        dom_name(): string;
        enabled(): boolean;
        disabled(): boolean;
        value(val?: any): any;
        value_changed(val?: any): any;
        autofocus(val?: any): any;
        hint(): string;
        type(val?: any): any;
        field(): {
            "disabled": any;
            "value": any;
            "autofocus": any;
            "placeholder": any;
            "type": any;
        };
        event_change(event?: any): any;
        event(): {
            "input": (event?: any) => any;
        };
    }
}
declare namespace $.$mol {
    class $mol_string extends $.$mol_string {
        event_change(next?: Event): void;
        disabled(): boolean;
    }
}
declare namespace $ {
    class $mol_row extends $mol_view {
        style(): {
            "minHeight": any;
        };
    }
}
declare namespace $ {
    class $mol_row_sub extends $mol_view {
    }
}
declare namespace $.$mol {
    class $mol_row extends $.$mol_row {
        item_offsets_top(): number[];
        sub_visible(): (string | number | boolean | Node | $mol_view)[];
        minimal_height(): number;
    }
}
declare namespace $ {
    class $mol_form extends $mol_view {
        submit_blocked(): boolean;
        form_fields(): any[];
        barFields(): $mol_view;
        buttons(): any[];
        barButtons(): $mol_row;
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_form extends $.$mol_form {
        submit_blocked(): boolean;
    }
}
declare namespace $ {
    class $mol_form_field extends $mol_view {
        name(): string;
        namer(): $mol_view;
        errors(): any[];
        bider(): $mol_view;
        label(): $mol_view;
        control(): any;
        sub(): any[];
    }
}
declare namespace $ {
    enum $mol_keyboard_code {
        backspace = 8,
        tab = 9,
        enter = 13,
        shift = 16,
        ctrl = 17,
        alt = 18,
        pause = 19,
        capsLock = 20,
        escape = 27,
        space = 32,
        pageUp = 33,
        pageDown = 34,
        end = 35,
        home = 36,
        left = 37,
        up = 38,
        right = 39,
        down = 40,
        insert = 45,
        delete = 46,
        key0 = 48,
        key1 = 49,
        key2 = 50,
        key3 = 51,
        key4 = 52,
        key5 = 53,
        key6 = 54,
        key7 = 55,
        key8 = 56,
        key9 = 57,
        A = 65,
        B = 66,
        C = 67,
        D = 68,
        E = 69,
        F = 70,
        G = 71,
        H = 72,
        I = 73,
        J = 74,
        K = 75,
        L = 76,
        M = 77,
        N = 78,
        O = 79,
        P = 80,
        Q = 81,
        R = 82,
        S = 83,
        T = 84,
        U = 85,
        V = 86,
        W = 87,
        X = 88,
        Y = 89,
        Z = 90,
        metaLeft = 91,
        metaRight = 92,
        select = 93,
        numpad0 = 96,
        numpad1 = 97,
        numpad2 = 98,
        numpad3 = 99,
        numpad4 = 100,
        numpad5 = 101,
        numpad6 = 102,
        numpad7 = 103,
        numpad8 = 104,
        numpad9 = 105,
        multiply = 106,
        add = 107,
        subtract = 109,
        decimal = 110,
        divide = 111,
        F1 = 112,
        F2 = 113,
        F3 = 114,
        F4 = 115,
        F5 = 116,
        F6 = 117,
        F7 = 118,
        F8 = 119,
        F9 = 120,
        F10 = 121,
        F11 = 122,
        F12 = 123,
        numLock = 144,
        scrollLock = 145,
        semicolon = 186,
        equals = 187,
        comma = 188,
        dash = 189,
        period = 190,
        forwardSlash = 191,
        graveAccent = 192,
        bracketOpen = 219,
        slashBack = 220,
        bracketClose = 221,
        quoteSingle = 222,
    }
}
declare namespace $ {
    class $mol_button extends $mol_view {
        enabled(): boolean;
        event_click(event?: any): any;
        event_activate(event?: any): any;
        evenet_key_press(event?: any): any;
        event(): {
            "click": (event?: any) => any;
            "keypress": (event?: any) => any;
        };
        disabled(): boolean;
        tab_index(): string;
        attr(): {
            "disabled": any;
            "role": any;
            "tabindex": any;
        };
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_button extends $.$mol_button {
        disabled(): boolean;
        event_activate(next: Event): void;
        evenet_key_press(event: KeyboardEvent): void;
        tab_index(): string;
    }
}
declare namespace $ {
    class $mol_button_major extends $mol_button {
    }
}
declare namespace $ {
    class $mol_button_minor extends $mol_button {
    }
}
declare namespace $ {
    class $mol_button_danger extends $mol_button {
    }
}
declare namespace $ {
    class $mol_app_inventory_enter extends $mol_view {
        domain(): $mol_app_inventory_domain;
        entered(val?: any): any;
        loginLabel(): string;
        loginErrors(): any[];
        login(val?: any): any;
        loginControl(): $mol_string;
        loginField(): $mol_form_field;
        passwordLabel(): string;
        passwordErrors(): any[];
        password(val?: any): any;
        passControl(): $mol_string;
        passwordField(): $mol_form_field;
        submitLabel(): string;
        event_submit(event?: any): any;
        submit_blocked(): boolean;
        submit(): $mol_button_major;
        form(): $mol_form;
        message(): string;
        sub(): any[];
        messageNoAccess(): string;
    }
}
declare var cpprun: any;
declare namespace $.$mol {
    class $mol_app_inventory_enter extends $.$mol_app_inventory_enter {
        event_submit(): void;
        message(): string;
    }
}
declare namespace $ {
    class $mol_scroll extends $mol_view {
        minimal_height(): number;
        scroll_top(val?: any): any;
        scroll_left(val?: any): any;
        field(): {
            "scrollTop": any;
            "scrollLeft": any;
        };
        event_scroll(event?: any): any;
        event(): {
            "scroll": (event?: any) => any;
            "overflow": (event?: any) => any;
            "underflow": (event?: any) => any;
        };
    }
}
declare namespace $ {
    interface $mol_view_context {
        $mol_scroll_scroll_top(): number;
        $mol_scroll_scroll_left(): number;
        $mol_scroll_moving(): boolean;
    }
}
declare namespace $.$mol {
    class $mol_scroll extends $.$mol_scroll {
        scroll_top(next?: number): number;
        scroll_left(next?: number): number;
        scroll_bottom(next?: number): number;
        scroll_right(next?: number): number;
        event_scroll(next?: Event): void;
        moving(next?: boolean): boolean;
        context_sub(): $mol_view_context;
    }
}
declare namespace $ {
    class $mol_page extends $mol_view {
        Title(): $mol_view;
        head(): any[];
        Head(): $mol_view;
        body(): any[];
        Body(): $mol_scroll;
        foot(): any[];
        Foot(): $mol_view;
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_bar extends $mol_view {
    }
}
declare namespace $ {
    class $mol_svg extends $mol_view {
        dom_name(): string;
        dom_name_space(): string;
    }
}
declare namespace $ {
    class $mol_svg_root extends $mol_view {
        dom_name(): string;
        viewBox(): string;
        attr(): {
            "viewBox": any;
        };
    }
}
declare namespace $ {
    class $mol_svg_path extends $mol_svg {
        dom_name(): string;
        geometry(): string;
        attr(): {
            "d": any;
        };
    }
}
declare namespace $ {
    class $mol_svg_circle extends $mol_svg {
        dom_name(): string;
        radius(): string;
        pos_x(): string;
        pos_y(): string;
        attr(): {
            "r": any;
            "cx": any;
            "cy": any;
        };
    }
}
declare namespace $ {
    class $mol_icon extends $mol_svg {
        viewBox(): string;
        attr(): {
            "viewBox": any;
        };
        path(): string;
        pather(): $mol_svg_path;
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_icon_minus extends $mol_icon {
        path(): string;
    }
}
declare namespace $ {
    class $mol_icon_plus extends $mol_icon {
        path(): string;
    }
}
declare namespace $ {
    class $mol_number extends $mol_bar {
        precision(): number;
        precision_view(): number;
        precision_change(): number;
        value(val?: any): any;
        event_wheel(val?: any): any;
        event(): {
            "wheel": (val?: any) => any;
        };
        event_dec(val?: any): any;
        enabled(): boolean;
        dec_enabled(): boolean;
        dec_icon(): $mol_icon_minus;
        Dec(): $mol_button;
        value_string(val?: any): any;
        hint(): string;
        string_enabled(): boolean;
        String(): $mol_string;
        event_inc(val?: any): any;
        inc_enabled(): boolean;
        inc_icon(): $mol_icon_plus;
        Inc(): $mol_button;
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_number extends $.$mol_number {
        event_dec(next?: Event): void;
        event_inc(next?: Event): void;
        value_string(next?: string): any;
        event_wheel(next?: MouseWheelEvent): void;
    }
}
declare namespace $ {
    class $mol_check extends $mol_button {
        checked(val?: any): any;
        attr(): {
            "mol_check_checked": any;
            "aria-checked": any;
            "role": any;
            "disabled": any;
            "tabindex": any;
        };
        Icon(): any;
        label(): any[];
        Label(): $mol_view;
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_check extends $.$mol_check {
        event_click(next?: Event): void;
    }
}
declare namespace $ {
    class $mol_switch extends $mol_view {
        minimal_height(): number;
        option_checked(id: any, val?: any): any;
        option_title(id: any): string;
        enabled(): boolean;
        option_enabled(id: any): boolean;
        Option(id: any): $mol_check;
        value(val?: any): any;
        options(): {};
        items(): any[];
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_switch extends $.$mol_switch {
        value(next?: any): any;
        options(): {
            [key: string]: string;
        };
        items(): $.$mol_check[];
        option_title(key: string): string;
        option_checked(key: string, next?: boolean): boolean;
    }
}
declare namespace $ {
    class $mol_app_inventory_position extends $mol_row {
        position(): any;
        title(): string;
        Title(): $mol_view;
        description(): string;
        Description(): $mol_view;
        Product(): $mol_view;
        count_editable(): boolean;
        count(val?: any): any;
        Count(): $mol_number;
        status(val?: any): any;
        status_label_pending(): string;
        status_label_approved(): string;
        status_label_rejected(): string;
        Status(): $mol_switch;
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_app_inventory_position extends $.$mol_app_inventory_position {
        position(): $mol_app_inventory_domain_position;
        title(): string;
        description(): string;
        count(next?: number): number;
        status(next?: keyof typeof $mol_app_inventory_domain_position_status): "draft" | "approved" | "completed" | "pending" | "rejected";
    }
}
declare namespace $ {
    class $mol_app_inventory_controller extends $mol_page {
        domain(): $mol_app_inventory_domain;
        position_rows(): any[];
        body(): any[];
        position(id: any): any;
        Position_row(id: any): $mol_app_inventory_position;
        event_sweep(event?: any): any;
        submit_label(): string;
        Sweep(): $mol_button_major;
        Controls_row(): $mol_row;
        foot(): any[];
    }
}
declare namespace $.$mol {
    class $mol_app_inventory_controller extends $.$mol_app_inventory_controller {
        position(id: string): $mol_app_inventory_domain_position;
        position_rows(): $.$mol_app_inventory_position[];
        positions(): $mol_app_inventory_domain_position[];
        event_sweep(next?: Event): void;
    }
}
declare var cordova: any;
declare namespace $ {
    var $mol_cordova: any;
    function $mol_cordova_camera(): any;
}
declare namespace $ {
    class $mol_code extends $mol_view {
        value(val?: any): any;
        format(): string;
        hint(): string;
        Manual(): $mol_string;
        event_scan(val?: any): any;
        scan_label(): string;
        Scan(): $mol_button;
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_code extends $.$mol_code {
        scan_support(): boolean;
        Scan(): $.$mol_button;
        event_scan(): void;
    }
}
declare namespace $ {
    class $mol_app_inventory_keeper extends $mol_page {
        domain(): $mol_app_inventory_domain;
        position_rows(): any[];
        body(): any[];
        position(id: any): any;
        Position_row(id: any): $mol_app_inventory_position;
        code_new(val?: any): any;
        code_new_hint(): string;
        Code(): $mol_code;
        event_submit(event?: any): any;
        submit_label(): string;
        Submit(): $mol_button_major;
        Action_row(): $mol_row;
        foot(): any[];
    }
}
declare namespace $.$mol {
    class $mol_app_inventory_keeper extends $.$mol_app_inventory_keeper {
        position(id: string): $mol_app_inventory_domain_position;
        code_new(next?: string): string;
        position_rows(): $.$mol_app_inventory_position[];
        positions(): $mol_app_inventory_domain_position[];
        event_submit(next?: Event): void;
    }
}
declare namespace $ {
    class $mol_app_inventory_stats extends $mol_page {
        domain(): $mol_app_inventory_domain;
    }
}
declare namespace $ {
    class $mol_app_inventory extends $mol_view {
        domain(): $mol_app_inventory_domain;
        Page(): any;
        sub(): any[];
        can_write_off(): boolean;
        can_approve(): boolean;
        Head(): $mol_app_inventory_head;
        Enter(): $mol_app_inventory_enter;
        Controller(): $mol_app_inventory_controller;
        Keeper(): $mol_app_inventory_keeper;
        Stats(): $mol_app_inventory_stats;
    }
}
declare namespace $ {
    class $mol_app_inventory_head extends $mol_row {
        keeper_show(): boolean;
        control_show(): boolean;
        keeper_label(): string;
        Keeper_link(): $mol_link;
        control_label(): string;
        Control_link(): $mol_link;
        stats_label(): string;
        Stats_link(): $mol_link;
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_app_inventory extends $.$mol_app_inventory {
        Page(): $mol_view;
        page_name(next?: string): string;
        can_write_off(): boolean;
        can_approve(): boolean;
    }
    class $mol_app_inventory_head extends $.$mol_app_inventory_head {
        sub(): $.$mol_link[];
    }
}
declare namespace $ {
    class $mol_unit extends $mol_object {
        'valueOf()': number;
        constructor(value?: number);
        prefix(): string;
        postfix(): string;
        valueOf(): number;
        delimiter(): string;
        value_view(): string;
        toString(): string;
        static summ(a: $mol_unit, b: $mol_unit): any;
        mult(m: number): any;
    }
}
declare namespace $ {
    class $mol_unit_money extends $mol_unit {
    }
    class $mol_unit_money_usd extends $mol_unit_money {
        prefix(): string;
    }
    class $mol_unit_money_rur extends $mol_unit_money {
        postfix(): string;
    }
}
declare module $jin {
    function concater(funcs: (string | {
        (val?: any): string;
    })[]): (val?: any) => string;
}
declare module $jin.time {
    class base_class {
        static patterns: any;
        static formatter(pattern: string): any;
        toString(pattern: string): any;
    }
}
declare function $jin_type(value: any): any;
declare module $jin.time {
    interface duration_iconfig {
        year?: number | string;
        month?: number | string;
        day?: number | string;
        hour?: number | string;
        minute?: number | string;
        second?: number | string;
    }
    class duration_class extends $jin.time.base_class {
        static make(duration?: number | number[] | string | duration_iconfig): duration_class;
        _year: number;
        readonly year: number;
        _month: number;
        readonly month: number;
        _day: number;
        readonly day: number;
        _hour: number;
        readonly hour: number;
        _minute: number;
        readonly minute: number;
        _second: number;
        readonly second: number;
        constructor(config: duration_iconfig);
        summ(config: number | number[] | string | duration_iconfig): duration_class;
        sub(config: number | number[] | string | duration_iconfig): duration_class;
        valueOf(): number;
        toJSON(): any;
        toString(pattern?: string): any;
        static patterns: {
            '#Y': (duration: duration_class) => string;
            '#M': (duration: duration_class) => string;
            '#D': (duration: duration_class) => string;
            '#h': (duration: duration_class) => string;
            '#m': (duration: duration_class) => string;
            '#s': (duration: duration_class) => string;
            '+hh': (duration: duration_class) => string;
            'mm': (duration: duration_class) => string;
        };
    }
    var duration: any;
}
declare module $jin.time {
    interface moment_iconfig {
        year?: number | string;
        month?: number | string;
        day?: number | string;
        hour?: number | string;
        minute?: number | string;
        second?: number | string;
        offset?: number | number[] | string | $jin.time.duration_iconfig;
    }
    class moment_class extends $jin.time.base_class {
        static duration_class: typeof duration_class;
        static make(moment?: number | number[] | Date | string | moment_iconfig): moment_class;
        private _year;
        readonly year: number;
        private _month;
        readonly month: number;
        private _day;
        readonly day: number;
        private _hour;
        readonly hour: number;
        private _minute;
        readonly minute: number;
        private _second;
        readonly second: number;
        private _offset;
        readonly offset: duration_class;
        constructor(config: moment_iconfig);
        private _native;
        readonly native: Date;
        readonly normal: moment_class;
        readonly weekDay: number;
        merge(config: number | number[] | Date | string | moment_iconfig): moment_class;
        shift(config: number | number[] | string | $jin.time.duration_iconfig): moment_class;
        sub(config: number | number[] | Date | string | moment_iconfig): duration_class;
        toOffset(duration: number | number[] | string | $jin.time.duration_iconfig): moment_class;
        valueOf(): number;
        toJSON(): any;
        toString(pattern?: string): any;
        static patterns: {
            'YYYY': (moment: moment_class) => string;
            'AD': (moment: moment_class) => string;
            'YY': (moment: moment_class) => string;
            'Month': (moment: moment_class) => string;
            'Mon': (moment: moment_class) => string;
            '-MM': (moment: moment_class) => string;
            'MM': (moment: moment_class) => string;
            'M': (moment: moment_class) => string;
            'WeekDay': (moment: moment_class) => string;
            'WD': (moment: moment_class) => string;
            '-DD': (moment: moment_class) => string;
            'DD': (moment: moment_class) => string;
            'D': (moment: moment_class) => string;
            'Thh': (moment: moment_class) => string;
            'hh': (moment: moment_class) => string;
            'h': (moment: moment_class) => string;
            ':mm': (moment: moment_class) => string;
            'mm': (moment: moment_class) => string;
            'm': (moment: moment_class) => string;
            ':ss': (moment: moment_class) => string;
            'ss': (moment: moment_class) => string;
            's': (moment: moment_class) => string;
            '.sss': (moment: moment_class) => string;
            'sss': (moment: moment_class) => string;
            'Z': (moment: moment_class) => any;
        };
        static monthLong: string[];
        static monthShort: string[];
        static weekDayLong: string[];
        static weekDayShort: string[];
    }
    var moment: {
        [index: string]: typeof moment_class;
        (moment?: number | number[] | Date | string | moment_iconfig): moment_class;
    };
    class moment_class_ru extends moment_class {
        static monthLong: string[];
        static monthShort: string[];
        static weekDayLong: string[];
        static weekDayShort: string[];
    }
}
declare namespace $ {
    function $mol_stub_select_random<Value>(list: Value[]): Value;
    function $mol_stub_strings(prefix?: string, count?: number, length?: number): any[];
    function $mol_stub_code(length?: number): string;
    function $mol_stub_price(max?: number): $mol_unit_money_usd;
    function $mol_stub_product_name(): string;
    function $mol_stub_company_name_big(): string;
    function $mol_stub_company_name_small(): string;
    function $mol_stub_company_name(): string;
    function $mol_stub_person_name(): string;
    function $mol_stub_city(): string;
    function $mol_stub_time(maxShift?: number): $jin.time.moment_class;
}
declare namespace $ {
    class $mol_app_inventory_domain_mock extends $mol_app_inventory_domain {
        products_table(): {
            R_MATERIAL_ID: string;
            R_NAME: string;
            R_BARCODE: string;
        }[];
        positions_table(next?: $mol_app_inventory_domain_position_raw[]): $mol_app_inventory_domain_position_raw[];
        authentificated(): boolean;
        message(): string;
    }
}
declare namespace $ {
    class $mol_app_inventory_demo extends $mol_app_inventory {
        domain(): $mol_app_inventory_domain_mock;
    }
}
