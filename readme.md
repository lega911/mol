# $mol [![Build Status](https://travis-ci.org/eigenmethod/mol.svg?branch=master)](https://travis-ci.org/eigenmethod/mol)

Reactive micro-modular ui framework. Very simple, but very powerful!

# Features

* [Zero configuration](#zero-configuration). Just checkout and use it.
* [Lazy rendering/evaluating/loading etc](#lazyness).
* [Full reactivity](#reactivity) in all application layers. Not only between View and ViewModel.
* [Automatic dependency tracking](#reactivity) between reactive containers. No need to manual publish/subscribe/unsubscribe and streams routing.
* [Effective state synchronization](atom) in right way. 
* Automatic include modules to package at compile time. No need to manual import them. [Just use it](#zero-configuration).
* Very small modules. [All of them are optional](#zero-configuration).
* Cross platform. [Support any environment](#zero-configuration) (NodeJS, Web browsers, Cordova).
* Static typing ([TypeScript](https://www.typescriptlang.org/)). Full IDE support.
* Full customization. No implementation hiding. [All aspects are overridable](#lego-components).
* [Lifecycle management](#reactivity). Automatic destroy of unnecessary objects.
* [Easy debugging](#debugging). User friendly id's of all objects. Quick access to all objects from console.
* Easy [user friendly logging](#debugging) of all state changes.
* Pseudosynchronous code. [Asynchrony is abstracted by reactivity](#reactivity). No callbacks/promises/streams hell. No async/await/yield virus.
* Automatic [BEM](https://en.bem.info/methodology/naming-convention/)-attributes generation for elements.

# [Demo applications](demo)

* [$mol_app_hello](app/hello) - Very simple application ([online](https://eigenmethod.github.io/mol/app/hello/))
* [$mol_app_demo](app/demo) - Demonstration of all components ([online](http://eigenmethod.github.io/mol/))
* [$mol_app_todomvc](app/todomvc) - [ToDoMVC](http://todomvc.com/) implementation ([online](http://eigenmethod.github.io/mol/app/todomvc/))
* [$mol_app_supplies](app/supplies) - Supplies management tool ([online](https://eigenmethod.github.io/mol/app/supplies/))
* [$mol_app_signup](app/signup) - Simple form with persistence ([online](http://eigenmethod.github.io/mol/#demo=mol_app_signup))
* [$mol_app_users](app/users) - GitHub user "management" tool ([online](http://eigenmethod.github.io/mol/#demo=mol_app_users))
* [$mol_app_taxon](app/taxon) - Big hierarchical table wild database ([online](http://eigenmethod.github.io/mol/app/taxon/demo/))
* [$mol_app_bench](app/bench) - Abstract benchmarking interface ([online](http://eigenmethod.github.io/mol/app/bench/))

# Benchmarks

* [$mol_app_bench_list](app/bench/list) - Frameworks comparison ([online](http://eigenmethod.github.io/mol/app/bench/#becnh=list#sort=fill#))
* [ToDoMVC benchmark](https://github.com/eigenmethod/todomvc/tree/master/benchmark)
([online](https://eigenmethod.github.io/mol/app/bench/#bench=%2Ftodomvc%2Fbenchmark%2F#sample=angular2~angularjs~knockoutjs~mol~polymer~react-alt~vanillajs~vue#sort=fill#))
* [WebPageTest - Loading progress of ToDOMVC applications on some frameworks](https://www.webpagetest.org/video/compare.php?tests=161217_V8_6RFK%2C161217_G9_6RFM%2C161217_YZ_6RFN%2C161217_DM_6RFP%2C161217_2B_6RFQ%2C161217_RJ_6RFR%2C161217_2R_6RFS%2C161217_H5_6RFT%2C161217_CW_6RFV&thumbSize=150&ival=100&end=all)

# Articles

* [$mol: реактивный микромодульный фреймворк](https://habrahabr.ru/post/311172/) - Сomprehensive $mol review
* [$mol_atom: теория и практика реактивности](https://habrahabr.ru/post/317360/) - Object oriented reactive programming
* [Идеальный UI фреймворк](https://habrahabr.ru/post/276747/) - Problems of popular frameworks
* [React'ивные Panel'и](https://habrahabr.ru/post/314752/) - JSX vs view.tree
* [Tree — убийца JSON, XML, YAML и иже с ними](https://habrahabr.ru/post/248147/) - Tree format description
* [Атом — минимальный кирпичик FRP приложения](https://habrahabr.ru/post/235121/) - Theory of reactive containers
* [Принципы написания кода](https://habrahabr.ru/post/236785/) - Code style principles

# Any questions?

* [Ask us](https://github.com/eigenmethod/mol/issues/new?labels=question)
* [All answers](https://github.com/eigenmethod/mol/issues?q=label%3Aquestion+is%3Aclosed)

# Found a bug?

* [Report it](https://github.com/eigenmethod/mol/issues/new?labels=bug)
* [All bugs](https://github.com/eigenmethod/mol/labels/bug)

# Need feature?

* [Suggest it](https://github.com/eigenmethod/mol/issues/new?labels=improvement)
* [Vote for other](https://github.com/eigenmethod/mol/labels/improvement)

# Quick start

**Create MAM project**

Easy way is checkout this [preconfigured MAM repository](http://github.com/eigenmethod/mam) and start dev server:

```sh
git clone https://github.com/eigenmethod/mam.git ./mam && cd mam
npm install && npm start
```

**Create your application component**

In examples we will use namespace `my` and application name `hello`, but you could use your own namespace and application name.

Add **web entry point** at `./my/hello/index.html`:

```html
<!-- Disable quirks mode -->
<!doctype html>

<!-- Allow height:100% in body -->
<html style=" height: 100% ">

<!-- Force utf-8 encoding -->
<meta charset="utf-8" />
	
<!-- Disable mobile browser auto zoom, $mol is adaptive -->
<meta name="viewport" content="width=device-width" />
	
<!-- link to autogenerated css bundle -->
<link rel="stylesheet" href="-/web.css" />

<!-- link to autogenerated js bundle -->
<script src="-/web.js"></script>

<!-- link to optional autogenerated test js bundle -->
<script src="-/web.test.js"></script>

<!-- autobind component to element on load -->
<body mol_view_root="$my_hello">
```

Your application will be served at **`http://localhost:8080/my/hello/`**. Open it. You should refresh page to view your changes.

Add [**declarative component description**](view) at `./my/hello/hello.view.tree` with string input field and greeting message:

```tree
$my_hello $mol_view
	sub /
		<= Name $mol_string
			hint \Name
			value?val <=> name?val \
		<= message \
```

Same code with comments:

```tree
$my_hello $mol_view - Create `$my_hello` component by extending `$mol_view` base component
	sub / - Overload base property `sub` by custom that returns two sub components: `Name` view and `message` string
		<= Name $mol_string - Define property `Name` that returns `$mol_string` with overloaded two properties: `hint` and `name`
			hint \Name - Define constant value for `hint` property
			value?val <=> name?val \ - Overload `value` property of `$mol_string` by property `name` with empty string as default value.
		<= message \ - Outputs value of `message` property with empty string as default value.
```

That will be compiled to typescript code like this:

```typescript
namespace $ { export class $my_hello extends $mol_view {

	/// name?val \
	@ $mol_mem()
	name( next? : any ) {
		return ( next !== void 0 ) ? next : ""
	}

	/// Name $mol_string 
	/// 	hint \Name
	/// 	value?val <=> name?val
	@ $mol_mem()
	Name() {
		return new $mol_string().setup( obj => { 
			obj.hint = () => "Name"
			obj.value = ( next? ) => this.name( next )
		} )
	}

	/// message \
	message() {
		return ""
	}

	/// sub / 
	/// 	<= Name
	/// 	<= message
	sub() {
		return [].concat( this.Name() , this.message() )
	}

} }
```

Add **your behaviour** at `./my/hello/hello.view.ts` by extending generated class:

```typescript
namespace $.$mol {
	export class $my_hello extends $.$my_hello {
		
		message() {
			let name = this.name()
			return name && `Hello, ${name}!`
		}
		
	}
}
```

Add **styles** at `./my/hello/hello.view.css`:

```css
/* Styling BEM-block by autogenerated attribute */
[my_hello] {
	margin: auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font: 1.5rem/1 sans-serif;
}

/* Styling BEM-element by autogenerated attribute */
[my_hello_name] {
	flex-grow: 0;
	margin: 1rem;
}
```

[That is all!](https://eigenmethod.github.io/mol/app/hello/)

# Rationale

## Zero configuration
Instead of ensuring configurable under any wanting, we better concentrate on, that all would worked good directly from the box and does not bother $mol's developer by a typical configure. (But, nevertheless it does not excludes setup for your needs if it is required)

For example if you download **[base MAM-project](http://github.com/eigenmethod/mam)** you'd have got that:

**Building of JS and CSS bundles for different platforms.** A bundle can be built for any module. In this bundle would be sources of that module and sources all other modules from which the module depends on. Also there would not redundant modules in the bundle.  

There are the full set of supports bundles:

* `-/web.js` - JS for browser
* `-/web.test.js` - JS with tests for a browser
* `-/web.css` - CSS styles for a browser
* `-/web.deps.json` - a map of dependencies modules for browser
* `-/web.locale=en.json` - strings pulled from view.tree sources
* `-/node.js` - JS for NodeJS
* `-/node.test.js` - JS with tests for NodeJS
* `-/node.deps.json` - a map of dependencies modules for NodeJS

**Support of Source Maps**. Sources are compiled and integrate to maps, they are fully self-sufficient.

**Development server**, witch would be compile bundles as needed. For example, when requested `http://localhost:8080/mol/app/todomvc/-/web.js` the `js` bundle is being built of `mol/app/todomvc` for `web` environment. Rebuilding would be occur only if some source file would be changed.

**Transpilling of modern CSS into CSS supported by browsers** ([postcss-cssnext](https://github.com/MoOx/postcss-cssnext)): vendor prefixes and variables etc.

**Transpilling [TypeScript](https://github.com/Microsoft/TypeScript) into JS**. 
In TS configuration enabled support decorators and disabled implicit `any` type, for prevent missing typing by change.

**Watching dependencies by fact of using** and inclusion the needed modules automatically at further bundle. You don't need to write `include` and `require` everything you need is to refer for essence by full name like `$mol_state_arg` and `$mol.state.arg` (looking at its definition) in `*.ts`, `*.view.ts`, `*.view.tree` and `*.jam.js` files. At CSS files its dependencies are looked for by entries like `[mol_check_checked]` , `[mol_check_checked=` and `.mol_check_checked`.

## Lego components

At $mol is used the component approach to the building of interface, however **every component is self-sufficient** and can be used as the self-sufficient application. Small components are aggregated inside of larger components etc.

Unlike another frameworks the $mol does not seek to isolate the insides of the components. Vice versa, there is comfortable mechanism is provided for developers for configuration them, it is not required from the creator of the component to do any additional gestures.

For example, to set the list of sub components you need to redefine `sub` property in view.tree

```tree
$mol_view
	sub /
		< Button1 $mol_filler
		< Button2 $mol_filler
```

Or the same code through TypeScript would be:

```typescript
new $mol_view().setup( obj => {
	obj.sub = ()=> [ this.Button1() , this.Button2() ]
} )
```

In both variants the compiler would verify existence of the property and accordance of the signature. In normal mode you don't need to work with fields of the object directly, so all definable properties 
are public and can be safely overloaded.

Details about viewers and `view.tree` language: [$mol_view](view).

## Lazyness
[$mol_view](view) implements lazy rendering. [$mol_scroll](scroll) is watching scroll's position and suggest to the embedded components about the view height. [$mol_list](list) knowing about the view height and minimal sizes of the embedded components, it excludes from rendering process the components that is not got into viewport for sure. And all other components can suggest it about their minimal size through `minimal_height` property.

```
$my_icon $mol_view
	minimal_height 16
```

At the result it come out than opening any window occur while instant time. It's independent of output data size. And since data would not be rendered, then any requests would not be proceeded. It's allowed us to download them partly, when they are needed. That features are possible due to reactive architecture, that are penetrated all layers of application.

## Reactivity
Unlike the control-flow architectures, in $mol was implemented the data-flow architecture. All applications are described as a set of classes, having properties. Every property is described as some function from another property (and properties of another classes too). Properties, to which were appealed while function processing were saved as dependencies of our property. In case of changing their values, all dependant on them properties would be invalidated cascaded. And appealing to non relevant property would lead to its pre-actualization.

In this way the whole application at the execution stage represents a huge tree of dependencies, at the root of the tree is located the special property, which in case of invalidation would actualize itself automatically. And as any property always knows, whether something depends from it or not, then it is given a simple and reliable mechanism of controlling lifecycle of objects - they creates if the dependence appears and are destroyed when nothing depend from it. It's solved two fundamental problem: resources leaks and cache invalidation. 

Besides, the reactive architecture allows us to abstract code elegantly from asynchronous operations. If the function can't return value at once, it can throws the exception `$mol_atom_wait`, it is marked part of the tree of states as "waiting of results". When the result would be retrieved - it could be inserted into property directly and application would be reconstructed for the new state.

```typescript
namespace $ {
	export class $my_greeter {
		
		// Define memoized property with push support
		@ $mol_mem()
		greeting( next? : string , force? : $mol_atom_force ) : string {
			
			// Defered push value to property
			setTimeout( () => {
				this.greeting( 'Hello!' , $mol_atom_force )
			} , 1000 )
			
			// throw special error to notify about waiting
			throw new $mol_atom_wait( 'Wait!' )
		}
		
		// Define memoized property without push support
		@ $mol_mem()
		greeting_length() {
			// Using other properties in synchronous style
			return this.greeting().length
		}
		
	}
}
```

Details: [$mol_mem](mem), [$mol_atom](atom).

## Debugging
A special attention is payed while developing $mol to debugging possibilities and researching of code's working process. For example for handling exceptions we don't using (`try-catch-throw`),
 because it masks the true place where exceptions were thrown, it complicates debugging. 

For every DOM-element is formed a people friendly `id` automatically like `$mol_app_todomvc.root(0).taskRow(0).titler()`, which is valid javascript code, this one could be executed at a console, received a link to the component, whom the component is corresponds to. Unfolding the content of the component you'd see names and values its fields like:

```
$mol_app_todomvc
    dom_node() : div#$mol_app_todomvc.root(0)
    task(1474385802391) : Object
    task(1474386443175) : Object
    taskRow(0) : $mol_app_todomvc_task_rowRow
    taskRow(1) : $mol_app_todomvc_task_rowRow
    taskrows() : Array[2]
```

The name of the field corresponds to calling the property, the content of the field would be available through. And thanks to naming classes and functions through underscoring you'd always get to know which class instance in front of you and could briefly find it at code by default searching by the substring.

# Modules

## Flow

* **[$mol_defer](defer)** - deferred but immediate execution
* **[$mol_atom](atom)** - reactive container
* **[$mol_log](log)** - logging

## Object model

* **[$mol_mem](mem)** - reactive property decorator
* **[$mol_object](object)** - components base class

## Functions

* **[$mol_const](const)** - const value returning function

## Collections

* **[$mol_range](range)** - lazy array
* **[$mol_set](set)** - [Set API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
* **[$mol_dict](dict)** - [Map API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
* **[$mol_maybe](maybe)** - [maybe monad](https://en.wikipedia.org/wiki/Monad_(functional_programming)#The_Maybe_monad)
* **[$mol_hyperhive](hypehive)** - [HypeHive API](http://hhive.eap.eigenmethod.com/)

## [State modules](state)

* **[$mol_state_arg](state/arg)** - arguments state (location/argv)
* **[$mol_state_local](state/local)** - persistent local state (localStorage)
* **[$mol_state_session](state/session)** - session temporary state (sessionStorage)
* **[$mol_state_history](state/history)** - browser history bound state
* **[$mol_state_stack](state/stack)** - state of current stack of execution

## Communication modules

* **[$mol_http_resource](http/resource)** - Reactive REST HTTP resource
* **[$mol_http_request](http/request)** - Reactive HTTP Request

## Simple components

* **[$mol_view](view)** - reactive view model base class with lazy error-proof renderer
* **[$mol_filler](filler)** - lorem ipsum
* **[$mol_svg](svg)** - svg base components
* **[$mol_status](status)** - prints error status of some property

## Simple controls

* **[$mol_link](link)** - navigation link
* **[$mol_button](button)** - button
* **[$mol_check](check)** - check box
* **[$mol_switch](switch)** - radio buttons
* **[$mol_string](string)** - one string input control
* **[$mol_number](number)** - one number input control
* **[$mol_code](code)** - bar code scanner
* **[$mol_portion](portion)** - portion visualizer

## Layout components

* **[$mol_scroll](scroll)** - scroll pane with position saving
* **[$mol_tiler](tiler)** - items in row with balanced wrapping
* **[$mol_row](row)** - items in row with wrapping and padding between
* **[$mol_bar](bar)** - group of controls as own control
* **[$mol_list](list)** - vertical list of rows
* **[$mol_labeler](labeler)** - labeled content
* **[$mol_section](section)** - section with header
* **[$mol_stack](stack)** - horizontal stack of panels
* **[$mol_page](page)** - page with header, body and footer
* **[$mol_deck](deck)** - deck of panels with tab bar
* **[$mol_card](card)** - card with content

## Complex components

* **[$mol_form](form)** - forms with validators
* **[$mol_demo](demo)** - demonstrates widget in various screens
* **[$mol_attach](attach)** - preview list and attach button
* **[$mol_cost](cost)** - prints currency values

## Data formats

* **[$mol_tree](tree)** - [tree format](https://github.com/nin-jin/tree.d) (`view.tree` language descripted at [$mol_view](view))

## Math

* **[$mol_graph](graph)** - graph algorithms
* **[$mol_unit](unit)** - typed number value
* **[$mol_merge_dict](merge/dict)** - merge two dictionaries to new one

## Resources

* **[$mol_logo](logo)** - $mol logotypes
* **[$mol_icon](icon)** - css styled icons
* **[$mol_skin](skin)** - theming

## Testing

* **[$mol_test](test)** - unit testing
* **[$mol_stub](stub)** - stub data generators

## API

* **[$mol_cordova](cordova)** - [Apache Cordova](https://cordova.apache.org) API
* **[$mol_exec](exec)** - synchronous execute of system command
* **[$mol_file](file)** - reactive file system wrapper
* **[$mol_window](window)** - reactive view port configuration

## Building

* **[$mol_build](build)** - MAM builder
* **[$mol_build_server](build/server)** - MAM developer server

# Cool stuff

* **[Commits visualization](http://ghv.artzub.com/#repo=mol&user=eigenmethod&climit=100000)**
* **[Sources visualization](http://veniversum.me/git-visualizer/?owner=eigenmethod&repo=mol)**
