from pandas._libs.tslibs import OutOfBoundsDatetime as OutOfBoundsDatetime

class PerformanceWarning(Warning): ...
class UnsupportedFunctionCall(ValueError): ...
class UnsortedIndexError(KeyError): ...
class ParserError(ValueError): ...
class DtypeWarning(Warning): ...
class EmptyDataError(ValueError): ...
class ParserWarning(Warning): ...
class MergeError(ValueError): ...
class AccessorRegistrationWarning(Warning): ...

class AbstractMethodError(NotImplementedError):
    methodtype = ...
    class_instance = ...
    def __init__(self, class_instance, methodtype: str = ...) -> None: ...
