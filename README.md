<br/>

<div align=left>

# util-extra

_name enough_

</div>

<br />
<details>
<summary>base/array</summary>

- [`ensure_array`](./base/array.ts#L23)
- [`is_array`](./base/array.ts#L38)
- [`is_empty_array`](./base/array.ts#L53)
- [`select_array`](./base/array.ts#L64)
- [`cut_at`](./base/array.ts#L102)
- [`cut`](./base/array.ts#L126)
- [`cut_all`](./base/array.ts#L144)
- [`ElementType`](./base/array.ts#L10)
- [`SelectArrayOptions`](./base/array.ts#L84)
</details>

<details>
<summary>base/boolean</summary>

- [`to_boolean`](./base/boolean.ts#L14)
- [`is_boolean`](./base/boolean.ts#L30)
- [`is_true`](./base/boolean.ts#L45)
- [`is_false`](./base/boolean.ts#L61)
- [`is_falsy`](./base/boolean.ts#L85)
- [`is_truthy`](./base/boolean.ts#L101)
- [`Falsy`](./base/boolean.ts#L70)
</details>

<details>
<summary>base/date</summary>

- [`is_date`](./base/date.ts#L118)
- [`is_invalid_date`](./base/date.ts#L127)
- [`assert_non_invalid_date`](./base/date.ts#L135)
- [`is_leap_year`](./base/date.ts#L143)
- [`is_valid_month_number`](./base/date.ts#L156)
- [`assert_month_number`](./base/date.ts#L161)
- [`is_valid_date_number`](./base/date.ts#L165)
- [`assert_date_number`](./base/date.ts#L170)
- [`is_valid_weekday_number`](./base/date.ts#L174)
- [`assert_weekday_number`](./base/date.ts#L179)
- [`is_valid_second_number`](./base/date.ts#L183)
- [`assert_second_number`](./base/date.ts#L188)
- [`is_valid_minute_number`](./base/date.ts#L192)
- [`assert_minute_number`](./base/date.ts#L197)
- [`is_valid_hour_number`](./base/date.ts#L201)
- [`assert_hour_number`](./base/date.ts#L206)
- [`are_same_date`](./base/date.ts#L216)
- [`ago`](./base/date.ts#L250)
- [`diff_date`](./base/date.ts#L301)
- [`get_quarter_of_year`](./base/date.ts#L395)
- [`get_month_days`](./base/date.ts#L421)
- [`get_12_hours_of_date`](./base/date.ts#L443)
- [`get_hour_of_timezone`](./base/date.ts#L451)
- [`to_date_year_string`](./base/date.ts#L491)
- [`to_date_weekday_string`](./base/date.ts#L502)
- [`to_date_timezone_string`](./base/date.ts#L513)
- [`to_date_quarter_string`](./base/date.ts#L529)
- [`to_date_month_number_string`](./base/date.ts#L538)
- [`to_date_month_string`](./base/date.ts#L548)
- [`to_date_midday_string`](./base/date.ts#L559)
- [`to_date_json`](./base/date.ts#L582)
- [`formatDate`](./base/date.ts#L597)
- [`render_calendar`](./base/date.ts#L946)
- [`DateConstant`](./base/date.ts#L6)
- [`DateUnit`](./base/date.ts#L27)
- [`WeekDay`](./base/date.ts#L38)
- [`TimezoneFormat`](./base/date.ts#L48)
- [`Quarter`](./base/date.ts#L54)
- [`Month`](./base/date.ts#L61)
- [`Midday`](./base/date.ts#L76)
- [`WeekDayNames`](./base/date.ts#L81)
- [`MonthNames`](./base/date.ts#L91)
- [`MiddayNames`](./base/date.ts#L106)
- [`DateAgoText`](./base/date.ts#L232)
- [`AgoOptions`](./base/date.ts#L276)
- [`DateDiffOptions`](./base/date.ts#L312)
- [`get_millisecond_of_year`](./base/date.ts#L365)
- [`get_second_of_year`](./base/date.ts#L370)
- [`get_minute_of_year`](./base/date.ts#L375)
- [`get_hour_of_year`](./base/date.ts#L380)
- [`get_weekday_of_year`](./base/date.ts#L385)
- [`get_date_of_year`](./base/date.ts#L390)
- [`DateNumberFormat`](./base/date.ts#L459)
- [`DateNameFormat`](./base/date.ts#L475)
- [`ToDateYearStringOptions`](./base/date.ts#L498)
- [`ToDateWeekDayStringOptions`](./base/date.ts#L508)
- [`ToDateTimezoneStringOptions`](./base/date.ts#L525)
- [`ToDateMonthNumberStringOptions`](./base/date.ts#L544)
- [`ToDateMonthStringOptions`](./base/date.ts#L554)
- [`ToDateMiddayStringOptions`](./base/date.ts#L565)
- [`DateJson`](./base/date.ts#L572)
- [`CalendarDataType`](./base/date.ts#L899)
- [`CalendarView`](./base/date.ts#L906)
- [`ToCalendarOptions`](./base/date.ts#L939)
</details>

<details>
<summary>base/function</summary>

- [`is_function`](./base/function.ts#L22)
- [`AnyFunction`](./base/function.ts#L8)
</details>

<details>
<summary>base/json</summary>

- [`Json`](./base/json.ts#L2)
</details>

<details>
<summary>base/never</summary>

- [`throw_never`](./base/never.ts#L15)
</details>

<details>
<summary>base/nil</summary>

- [`is_nil`](./base/nil.ts#L18)
- [`Nil`](./base/nil.ts#L4)
</details>

<details>
<summary>base/null</summary>

- [`is_null`](./base/null.ts#L11)
</details>

<details>
<summary>base/number</summary>

- [`is_number`](./base/number.ts#L15)
- [`is_nan`](./base/number.ts#L30)
- [`is_infinity`](./base/number.ts#L45)
- [`is_zero`](./base/number.ts#L55)
- [`is_integer`](./base/number.ts#L63)
- [`is_non_negative_integer`](./base/number.ts#L71)
- [`has_decimal`](./base/number.ts#L79)
- [`is_odd`](./base/number.ts#L88)
- [`is_even`](./base/number.ts#L97)
- [`assert_integer`](./base/number.ts#L111)
- [`assertPositiveInteger`](./base/number.ts#L119)
- [`assert_non_negative_integer`](./base/number.ts#L128)
- [`assertNonZero`](./base/number.ts#L137)
- [`assert_non_nan`](./base/number.ts#L146)
- [`assert_non_infinity`](./base/number.ts#L155)
- [`inc`](./base/number.ts#L165)
- [`dec`](./base/number.ts#L175)
- [`get_integer`](./base/number.ts#L184)
- [`divint`](./base/number.ts#L198)
- [`to_numeral_string`](./base/number.ts#L229)
- [`prepend_zero`](./base/number.ts#L253)
- [`DivintOptions`](./base/number.ts#L209)
</details>

<details>
<summary>base/object</summary>

- [`object_type`](./base/object.ts#L9)
- [`is_object`](./base/object.ts#L24)
- [`create_null_object`](./base/object.ts#L35)
- [`is_null_object`](./base/object.ts#L51)
- [`set_unenumerable`](./base/object.ts#L68)
- [`set_enumerable`](./base/object.ts#L83)
- [`is_enumerable`](./base/object.ts#L99)
</details>

<details>
<summary>base/promise</summary>

- [`Job`](./base/promise.ts#L1)
- [`Queue`](./base/promise.ts#L6)
</details>

<details>
<summary>base/regexp</summary>

- [`is_regexp`](./base/regexp.ts#L13)
</details>

<details>
<summary>base/string</summary>

- [`hash_string`](./base/string.ts#L8)
- [`random_string`](./base/string.ts#L25)
- [`is_string`](./base/string.ts#L34)
- [`is_blank_string`](./base/string.ts#L44)
- [`assert_non_blank_string`](./base/string.ts#L56)
- [`unwrap`](./base/string.ts#L91)
- [`unwrap_deep`](./base/string.ts#L111)
- [`unquote`](./base/string.ts#L128)
- [`wrap_pattern`](./base/string.ts#L162)
- [`wrap_quote`](./base/string.ts#L178)
- [`wrap_xml`](./base/string.ts#L189)
- [`PairPattern`](./base/string.ts#L62)
</details>

<details>
<summary>base/timer</summary>

- [`sleep`](./base/timer.ts#L11)
- [`delay`](./base/timer.ts#L16)
- [`timeout`](./base/timer.ts#L23)
- [`retry`](./base/timer.ts#L89)
- [`TimingFunctionType`](./base/timer.ts#L41)
- [`TIMING_FUNCTION`](./base/timer.ts#L55)
- [`TimingFunction`](./base/timer.ts#L71)
- [`Options`](./base/timer.ts#L76)
</details>

<details>
<summary>base/undefined</summary>

- [`is_undefined`](./base/undefined.ts#L11)
</details>

<details>
<summary>data/model</summary>

- [`Model`](./data/model.ts#L106)
- [`DataModel`](./data/model.ts#L3)
</details>

<details>
<summary>data/optional</summary>

- [`Some`](./data/optional.ts#L352)
- [`isOptional`](./data/optional.ts#L368)
- [`isSome`](./data/optional.ts#L377)
- [`isNone`](./data/optional.ts#L386)
- [`OPTIONAL_ERROR`](./data/optional.ts#L4)
- [`OPTIONAL_TRANSPOSE`](./data/optional.ts#L7)
- [`OptionalType`](./data/optional.ts#L10)
- [`UnpackOptional`](./data/optional.ts#L18)
- [`Optional`](./data/optional.ts#L21)
- [`None`](./data/optional.ts#L357)
</details>

<details>
<summary>data/result</summary>

- [`Ok`](./data/result.ts#L314)
- [`Err`](./data/result.ts#L323)
- [`is_result`](./data/result.ts#L335)
- [`is_ok`](./data/result.ts#L344)
- [`is_err`](./data/result.ts#L353)
- [`RESULT_TRANSPOSE`](./data/result.ts#L4)
- [`ResultType`](./data/result.ts#L7)
- [`UnpackResult`](./data/result.ts#L19)
- [`Result`](./data/result.ts#L27)
</details>

<details>
<summary>data/thunk</summary>

- [`thunk`](./data/thunk.ts#L3)
- [`Thunk`](./data/thunk.ts#L1)
</details>

