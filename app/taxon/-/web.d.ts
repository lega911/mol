declare namespace $ {
    function $mol_merge_dict<Target, Source>(target: Target, source: Source): Target & Source;
}
declare namespace $ {
    function $mol_log(path: string, values: any[]): void;
    namespace $mol_log {
        function filter(next?: string): string;
    }
}
declare namespace $ {
    class $mol_object {
        Class(): any;
        static objectPath(): any;
        'objectClassNames()': string[];
        objectClassNames(): string[];
        private 'objectOwner()';
        objectOwner(next?: {
            objectPath(): string;
        }): {
            objectPath(): string;
        };
        private 'objectField()';
        objectField(next?: string): string;
        objectPath(next?: string): string;
        setup(script: (obj: this) => void): this;
        'destroyed()': boolean;
        destroyed(next?: boolean): boolean;
        log(values: any[]): void;
        static toString(): any;
        toString(): string;
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
        handler: (next?: Value | Error, prev?: Value | Error) => Value;
        host: {
            objectPath(): string;
            [key: string]: any;
        };
        field: string;
        masters: $mol_set<$mol_atom<any>>;
        slaves: $mol_set<$mol_atom<any>>;
        status: $mol_atom_status;
        autoFresh: boolean;
        'value()': Value;
        constructor(handler: (next?: Value | Error, prev?: Value | Error) => Value, host?: {
            objectPath(): string;
            [key: string]: any;
        }, field?: string);
        destroyed(next?: boolean): boolean;
        unlink(): void;
        objectPath(): string;
        get(): Value;
        actualize(): void;
        pull(): any;
        _next: Value;
        set(next: Value, prev?: Value | Error): Value;
        push(next: Value | Error): Error | Value;
        obsoleteSlaves(): void;
        checkSlaves(): void;
        check(): void;
        obsolete(): Value;
        lead(slave: $mol_atom<any>): void;
        dislead(slave: $mol_atom<any>): void;
        obey(master: $mol_atom<any>): void;
        disobey(master: $mol_atom<any>): void;
        disobeyAll(): void;
        value(next?: Value, prev?: Value): Error | Value;
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
    function $mol_atom_task<Value>(handler: () => Value): $mol_atom<any>;
}
declare namespace $ {
    function $mol_mem<Host extends {
        objectPath(): string;
    }, Value>(config?: {
        lazy?: boolean;
    }): (obj: Host, name: string, descr: TypedPropertyDescriptor<(next?: Value, prev?: Value) => Value>) => void;
    function $mol_mem_key<Host extends {
        objectPath(): string;
    }, Key, Value>(config?: {
        lazy?: boolean;
    }): (obj: Host, name: string, descr: TypedPropertyDescriptor<(key: Key, next?: Value, prev?: Value) => Value>) => void;
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
declare var localStorage: Storage;
declare namespace $ {
    class $mol_state_local<Value> extends $mol_object {
        static value<Value>(key: string, next?: Value, prev?: Value): any;
        prefix(): string;
        value(key: string, next?: Value): any;
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
        response(next?: any, prev?: any): any;
        text(next?: string): string;
    }
}
declare namespace $ {
    var $mol_http_request_native: () => XMLHttpRequest;
}
declare namespace $ {
    class $mol_http_resource extends $mol_object {
        static item(uri: string): $mol_http_resource;
        uri(): string;
        credentials(): {
            login?: string;
            password?: string;
        };
        request(fresh?: boolean): $mol_http_request;
        text(next?: string, prev?: string): string;
        refresh(): void;
    }
    class $mol_http_resource_json<Content> extends $mol_http_resource {
        static item<Content>(uri: string): $mol_http_resource_json<Content>;
        json(next?: Content, prev?: Content): Content;
    }
}
declare namespace $ {
    interface $mol_locale_dict {
        [key: string]: string;
    }
    class $mol_locale extends $mol_object {
        static lang(next?: string): any;
        static texts(): $mol_locale_dict;
        static text(context: string, key: string): string;
    }
}
declare namespace $ {
    var $mol_viewer_context: $mol_viewer_context;
    interface $mol_viewer_context {
        $mol_viewer_heightLimit(): number;
    }
    class $mol_viewer extends $mol_object {
        static root(id: number): $mol_viewer;
        title(): string;
        static statePrefix(): string;
        statePrefix(): any;
        stateKey(postfix: string): string;
        context(next?: $mol_viewer_context): $mol_viewer_context;
        contextSub(): $mol_viewer_context;
        tagName(): string;
        nameSpace(): string;
        childs(): (string | number | boolean | Node | $mol_viewer)[];
        childsVisible(): (string | number | boolean | Node | $mol_viewer)[];
        heightMinimal(): number;
        private 'DOMNode()';
        DOMNode(next?: Element): Element;
        static renderChilds(node: Element, childs: ($mol_viewer | Node | string | number | boolean)[]): void;
        static renderAttrs(node: Element, attrs: {
            [key: string]: () => string | number | boolean;
        }): void;
        static renderFields(node: Element, fields: {
            [key: string]: (next?: any) => any;
        }): void;
        DOMTree(next?: Element): Element;
        attr(): {
            [key: string]: () => string | number | boolean;
        };
        field(): {
            [key: string]: (next?: any) => any;
        };
        event(): {
            [key: string]: (event: Event) => void;
        };
        focused(): boolean;
        localizedText(postfix: string): string;
    }
}
interface Window {
    cordova: any;
}
declare namespace $ {
}
declare namespace $ {
    class $mol_viewer_selection extends $mol_object {
        static focused(next?: Element[]): Element[];
        static position(...diff: any[]): any;
        static onFocus(event: FocusEvent): void;
        static onBlur(event: FocusEvent): void;
    }
}
declare namespace $ {
}
declare namespace $ {
    class $mol_scroller extends $mol_viewer {
        heightMinimal(): number;
        scrollTop(next?: any, prev?: any): any;
        scrollLeft(next?: any, prev?: any): any;
        field(): {
            [key: string]: (next?: any) => any;
        } & {
            "scrollTop": (next?: any, prev?: any) => any;
            "scrollLeft": (next?: any, prev?: any) => any;
        };
        eventScroll(next?: any, prev?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "scroll": (next?: any, prev?: any) => any;
            "overflow": (next?: any, prev?: any) => any;
            "underflow": (next?: any, prev?: any) => any;
        };
    }
}
declare namespace $ {
    class $mol_state_session<Value> extends $mol_object {
        static value<Value>(key: string, next?: Value, prev?: Value): Value;
        prefix(): string;
        value(key: string, next?: Value, prev?: Value): any;
    }
}
declare namespace $ {
    interface $mol_viewer_context {
        $mol_scroller_scrollTop(): number;
        $mol_scroller_moving(): boolean;
    }
}
declare namespace $.$mol {
    class $mol_scroller extends $.$mol_scroller {
        scrollTop(next?: number): number;
        scrollLeft(next?: number): number;
        scrollBottom(next?: number): number;
        scrollRight(next?: number): number;
        eventScroll(next?: Event): void;
        moving(next?: boolean): boolean;
        contextSub(): $mol_viewer_context;
        shadowStyle(): string;
    }
}
declare namespace $ {
    class $mol_pager extends $mol_viewer {
        titler(next?: any, prev?: any): $mol_viewer;
        head(): any[];
        header(next?: any, prev?: any): $mol_viewer;
        body(): any[];
        bodier(next?: any, prev?: any): $mol_scroller;
        foot(): any[];
        footer(next?: any, prev?: any): $mol_viewer;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_floater extends $mol_viewer {
        shiftStyle(): string;
        field(): {
            [key: string]: (next?: any) => any;
        } & {
            "style.transform": () => any;
        };
        scrolling(): boolean;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "mol_floater_scrolling": () => any;
        };
    }
}
declare namespace $.$mol {
    class $mol_floater extends $.$mol_floater {
        shiftStyle(): string;
        scrolling(): boolean;
    }
}
declare namespace $ {
    class $mol_clicker extends $mol_viewer {
        tagName(): string;
        enabled(): boolean;
        eventClick(next?: any, prev?: any): any;
        eventActivate(next?: any, prev?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "click": (next?: any, prev?: any) => any;
        };
        disabled(): boolean;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "disabled": () => any;
            "tabindex": () => any;
        };
    }
}
declare namespace $.$mol {
    class $mol_clicker extends $.$mol_clicker {
        disabled(): boolean;
        eventActivate(next: Event): void;
    }
}
declare namespace $ {
    class $mol_clicker_button extends $mol_clicker {
    }
}
declare namespace $ {
    class $mol_clicker_major extends $mol_clicker_button {
    }
}
declare namespace $ {
    class $mol_clicker_minor extends $mol_clicker_button {
    }
}
declare namespace $ {
    class $mol_clicker_danger extends $mol_clicker_button {
    }
}
declare namespace $ {
    class $mol_checker extends $mol_clicker {
        checked(next?: any, prev?: any): any;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "disabled": () => any;
            "tabindex": () => any;
        } & {
            "mol_checker_checked": (next?: any, prev?: any) => any;
        };
        icon(): any;
        label(): any[];
        labeler(next?: any, prev?: any): $mol_viewer;
        childs(): any[];
    }
}
declare namespace $.$mol {
    class $mol_checker extends $.$mol_checker {
        eventClick(next?: Event): void;
    }
}
declare namespace $ {
    class $mol_svg extends $mol_viewer {
        tagName(): string;
        nameSpace(): string;
    }
}
declare namespace $ {
    class $mol_svg_path extends $mol_svg {
        tagName(): string;
        geometry(): string;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "d": () => any;
        };
    }
}
declare namespace $ {
    class $mol_icon extends $mol_svg {
        viewBox(): string;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "viewBox": () => any;
        };
        path(): string;
        pather(next?: any, prev?: any): $mol_svg_path;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_icon_chevron extends $mol_icon {
        path(): string;
    }
}
declare namespace $ {
    class $mol_checker_expander extends $mol_checker {
        icon(next?: any, prev?: any): $mol_icon_chevron;
    }
}
declare namespace $ {
    class $mol_grider extends $mol_viewer {
        tagName(): string;
        rows(): any[];
        cols(): any[];
        records(): any[];
        record(key: any): any;
        hierarhyColumn(): string;
        rowers(): any[];
        rowHeight(): number;
        headerCellers(): any[];
        header(next?: any, prev?: any): $mol_grider_rower;
        gapTop(): number;
        gaperTop(next?: any, prev?: any): $mol_grider_gaper;
        gapBottom(): number;
        gaperBottom(next?: any, prev?: any): $mol_grider_gaper;
        cellers(key: any): any[];
        rower(key: any, next?: any, prev?: any): $mol_grider_rower;
        celler(key: any): any;
        cellerContent(key: any): any[];
        cellerText(key: any, next?: any, prev?: any): $mol_grider_celler;
        cellerNumber(key: any, next?: any, prev?: any): $mol_grider_number;
        columnHeaderContent(key: any): any[];
        columnHeader(key: any, next?: any, prev?: any): $mol_floater;
        rowLevel(key: any): number;
        rowExpanded(key: any, next?: any, prev?: any): any;
        cellerBranch(key: any, next?: any, prev?: any): $mol_grider_branch;
    }
}
declare namespace $ {
    class $mol_grider_gaper extends $mol_viewer {
        height(): number;
        heightStyle(): string;
        field(): {
            [key: string]: (next?: any) => any;
        } & {
            "style.height": () => any;
        };
    }
}
declare namespace $ {
    class $mol_grider_rower extends $mol_viewer {
        tagName(): string;
        height(): number;
        heightStyle(): string;
        field(): {
            [key: string]: (next?: any) => any;
        } & {
            "style.height": () => any;
        };
        cellers(): any[];
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_grider_celler extends $mol_viewer {
        tagName(): string;
    }
}
declare namespace $ {
    class $mol_grider_number extends $mol_grider_celler {
    }
}
declare namespace $ {
    class $mol_grider_branch extends $mol_checker_expander {
        tagName(): string;
        level(): number;
        levelStyle(): string;
        field(): {
            [key: string]: (next?: any) => any;
        } & {
            "style.paddingLeft": () => any;
        };
        expanded(next?: any, prev?: any): any;
        checked(next?: any, prev?: any): any;
        expandable(): boolean;
        enabled(): boolean;
        content(): any[];
        label(): any[];
    }
}
declare namespace $.$mol {
    class $mol_grider extends $.$mol_grider {
        childs(): any[];
        viewWindow(): {
            top: number;
            bottom: number;
            count: number;
        };
        gapTop(): number;
        gapBottom(): number;
        headerCellers(): $.$mol_floater[];
        columnHeaderContent(colId: string): string[];
        rowers(): $.$mol_grider_rower[];
        cellers(row: string): $mol_viewer[];
        colType(col: string): string;
        celler(id: {
            row: string;
            col: string;
        }): $mol_viewer;
        cellerContent(id: {
            row: string;
            col: string;
        }): any[];
        records(): any;
        record(row: string): any;
        rows(): string[];
        row(row: number): string;
        cols(): string[];
    }
    class $mol_grider_gaper extends $.$mol_grider_gaper {
        heightStyle(): string;
    }
    class $mol_grider_rower extends $.$mol_grider_rower {
        heightStyle(): string;
    }
    class $mol_grider_branch extends $.$mol_grider_branch {
        levelStyle(): string;
        expandable(): boolean;
    }
}
declare namespace $ {
    function $mol_const<Value>(value: Value): {
        (): Value;
        '()': Value;
    };
}
declare namespace $ {
    class $mol_range_common<Value> extends Array<Value> {
        item(id: number): Value;
        length: number;
        readonly '0': Value;
        forEach(handle: (value?: Value, id?: number) => void): void;
        valueOf(): Value[];
        concat(...args: any[]): Value[];
        slice(start?: number, end?: number): $mol_range_lazy<Value>;
        map<ResValue>(proceed: (val: Value, id?: number) => ResValue): $mol_range_lazy<ResValue>;
        join(delim?: string): string;
        every(check: (value: Value, id: number) => boolean): boolean;
        some(check: (value: Value, id: number) => boolean): boolean;
    }
    class $mol_range_lazy<Value> extends $mol_range_common<Value> {
        private source;
        constructor(source?: {
            item(id: number): Value;
            length: number;
        });
        item(id: number): Value;
        readonly length: number;
    }
}
declare namespace $ {
    class $mol_app_taxon extends $mol_pager {
        hierarhyField(): string;
        records(): any[];
        record(key: any): any;
        rows(): any[];
        rowExpanded(key: any, next?: any, prev?: any): any;
        rowLevel(key: any): number;
        grider(next?: any, prev?: any): $mol_grider;
        body(): any[];
    }
}
declare namespace $.$mol {
    interface $mol_app_taxon_hierarhy_node {
        id: number;
        parent: $mol_app_taxon_hierarhy_node;
        childs: $mol_app_taxon_hierarhy_node[];
    }
    interface $mol_app_taxon_data_row {
        KeyId: number;
    }
    class $mol_app_taxon extends $.$mol_app_taxon {
        hierarhyUri(): string;
        hierarhy(): {
            [key: number]: $mol_app_taxon_hierarhy_node;
        };
        dataUri(): string;
        dataResource(id: number): $mol_http_resource_json<any>;
        dataTable(): $mol_app_taxon_data_row[];
        record(path: number[]): $mol_app_taxon_data_row;
        rowsSub(path: number[]): number[][];
        rowRoot(): number[];
        rows(): number[][];
        records(): $mol_range_lazy<{}>;
        branchExpanded(path: number[], next?: boolean): boolean;
        rowLevel(id: {
            row: number[];
        }): number;
        rowExpanded(id: {
            row: number[];
        }, next?: boolean): boolean;
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
        valueView(): string;
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
    function $mol_stub_selectRandom<Value>(list: Value[]): Value;
    function $mol_stub_strings(prefix?: string, count?: number, length?: number): any[];
    function $mol_stub_code(length?: number): string;
    function $mol_stub_price(max?: number): $mol_unit_money_usd;
    function $mol_stub_productName(): string;
    function $mol_stub_companyNameBig(): string;
    function $mol_stub_companyNameSmall(): string;
    function $mol_stub_companyName(): string;
    function $mol_stub_personName(): string;
    function $mol_stub_city(): string;
    function $mol_stub_time(maxShift?: number): $jin.time.moment_class;
}
declare namespace $ {
    class $mol_app_taxon_demo extends $mol_app_taxon {
        hierarhyField(): string;
    }
}
declare namespace $.$mol {
    class $mol_app_taxon_demo extends $.$mol_app_taxon_demo {
        hierarhy(): {
            [key: number]: $mol_app_taxon_hierarhy_node;
        };
        record(path: number[]): {
            name: string;
            age: number;
            sex: string;
            sexPrefer: string;
            birthDay: any;
            birthCity: string;
            deathDay: any;
            deathCity: string;
            cityWork: string;
            company: string;
            phoneOS: string;
            fingersCount: number;
        };
    }
}
