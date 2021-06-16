import numpy as np

def arrays_to_mgr(arrays, arr_names, index, columns, dtype = ...): ...
def masked_rec_array_to_mgr(data, index, columns, dtype, copy): ...
def init_ndarray(values, index, columns, dtype = ..., copy: bool = ...): ...
def init_dict(data, index, columns, dtype = ...): ...
def prep_ndarray(values, copy=...) -> np.ndarray: ...
def extract_index(data): ...
def reorder_arrays(arrays, arr_columns, columns): ...
def get_names_from_index(data): ...
def to_arrays(data, columns, coerce_float: bool = ..., dtype = ...): ...
def sanitize_index(data, index, copy: bool = ...): ...
