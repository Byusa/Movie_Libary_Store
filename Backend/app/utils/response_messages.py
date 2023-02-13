from sre_constants import SUCCESS

from django.utils.translation import gettext as _

# JSON response messages
SUCCESS = _("success")  # noqa: F811
FAILURE = _("failure")
WARNING = _("warning")
INVALID_REQUEST = _("Invalid request")
MALFORMED_DATA = _("Malformed data")
INVALID_DATA = _("Invalid data")
NO_DATA = _("No Data")
DUPLICATE_DATA = _("Field must be unique")


# General messages
SOMETHING_WENT_WRONG = _("Something went wrong. Please try again")

# General messages
UPLOAD_DENIED = _("Upgrade to a Paying Account.")

# GET messages
DATA_RETRIEVED_SUCCESSFULLY = _("Data Retrieved Successfully")


# PUT/PATCH messages
OBJECTS_SAVED_SUCCESSFULLY = _("Objects Saved Successfully")


# DELETE messages
OBJECTS_DELETED_SUCCESSFULLY = _("Objects Deleted Successfully")

# GET failure messages
DATA_NOT_RETRIEVED = _("Data not retrieved successfully")
