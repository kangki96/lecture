import sys
from typing import Optional

class MessageError(Exception): ...
class MessageParseError(MessageError): ...
class HeaderParseError(MessageParseError): ...
class BoundaryError(MessageParseError): ...
class MultipartConversionError(MessageError, TypeError): ...
class CharsetError(MessageError): ...

class MessageDefect(ValueError):
    def __init__(self, line: Optional[str] = ...) -> None: ...

class NoBoundaryInMultipartDefect(MessageDefect): ...
class StartBoundaryNotFoundDefect(MessageDefect): ...
class FirstHeaderLineIsContinuationDefect(MessageDefect): ...
class MisplacedEnvelopeHeaderDefect(MessageDefect): ...
class MultipartInvariantViolationDefect(MessageDefect): ...
class InvalidMultipartContentTransferEncodingDefect(MessageDefect): ...
class UndecodableBytesDefect(MessageDefect): ...
class InvalidBase64PaddingDefect(MessageDefect): ...
class InvalidBase64CharactersDefect(MessageDefect): ...
class InvalidBase64LengthDefect(MessageDefect): ...
class CloseBoundaryNotFoundDefect(MessageDefect): ...
class MissingHeaderBodySeparatorDefect(MessageDefect): ...

MalformedHeaderDefect = MissingHeaderBodySeparatorDefect

class HeaderDefect(MessageDefect): ...
class InvalidHeaderDefect(HeaderDefect): ...
class HeaderMissingRequiredValue(HeaderDefect): ...

class NonPrintableDefect(HeaderDefect):
    def __init__(self, non_printables: Optional[str]) -> None: ...

class ObsoleteHeaderDefect(HeaderDefect): ...
class NonASCIILocalPartDefect(HeaderDefect): ...

if sys.version_info >= (3, 10):
    class InvalidDateDefect(HeaderDefect): ...
