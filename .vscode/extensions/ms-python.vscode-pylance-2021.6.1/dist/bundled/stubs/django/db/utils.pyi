from typing import Any, Dict, Iterable, List, Optional, Iterator, Type

from django.apps import AppConfig
from django.db.backends.base.base import BaseDatabaseWrapper
from django.db.models import Model

DEFAULT_DB_ALIAS: str
DJANGO_VERSION_PICKLE_KEY: str

class Error(Exception): ...
class InterfaceError(Error): ...
class DatabaseError(Error): ...
class DataError(DatabaseError): ...
class OperationalError(DatabaseError): ...
class IntegrityError(DatabaseError): ...
class InternalError(DatabaseError): ...
class ProgrammingError(DatabaseError): ...
class NotSupportedError(DatabaseError): ...

def load_backend(backend_name: str) -> Any: ...

class ConnectionDoesNotExist(Exception): ...

class ConnectionHandler:
    databases: Dict[str, Dict[str, Optional[Any]]]
    def __init__(self, databases: Dict[str, Dict[str, Optional[Any]]] = ...) -> None: ...
    def ensure_defaults(self, alias: str) -> None: ...
    def prepare_test_settings(self, alias: str) -> None: ...
    def __getitem__(self, alias: str) -> BaseDatabaseWrapper: ...
    def __setitem__(self, key: str, value: BaseDatabaseWrapper) -> None: ...
    def __delitem__(self, key: BaseDatabaseWrapper) -> None: ...
    def __iter__(self) -> Iterator[str]: ...
    def all(self) -> List[BaseDatabaseWrapper]: ...
    def close_all(self) -> None: ...

class ConnectionRouter:
    def __init__(self, routers: Optional[Iterable[Any]] = ...) -> None: ...
    @property
    def routers(self) -> List[Any]: ...
    def db_for_read(self, model: Type[Model], **hints: Any) -> str: ...
    def db_for_write(self, model: Type[Model], **hints: Any) -> str: ...
    def allow_relation(self, obj1: Model, obj2: Model, **hints: Any) -> bool: ...
    def allow_migrate(self, db: str, app_label: str, **hints: Any) -> bool: ...
    def allow_migrate_model(self, db: str, model: Type[Model]) -> bool: ...
    def get_migratable_models(
        self, app_config: AppConfig, db: str, include_auto_created: bool = ...
    ) -> List[Type[Model]]: ...
