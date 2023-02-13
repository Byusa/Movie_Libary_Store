import json

from django.core.paginator import Paginator
from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse

from app.utils import response_messages


class JsonResponse(HttpResponse):
    def __init__(self, content, *args, **kwargs):
        super(HttpResponse, self).__init__(content, *args, **kwargs)
        self["Content-type"] = "application/json"
        self._content = content
        self.content = json.dumps(content, cls=DjangoJSONEncoder)

    def dumps(self):
        return self.content

    def to_html(self):
        return JsonResponse.html_tree(self._content)

    @staticmethod
    def html_tree(obj):
        to_bool = lambda obj: "true" if obj else "false"  # noqa: E731
        css_class = lambda obj, kind: "{}{}".format(  # noqa: E731
            (
                "string"
                if kind == str
                else "bool"
                if kind == bool
                else "null"
                if kind == isinstance(None)
                else "numeric"
            ),
            "-{}".format(to_bool(obj)) if isinstance(obj, bool) else "",
        )

        ul = (
            lambda obj: "{{<ul>{}</ul>}}".format(  # noqa: E731
                "\n".join(
                    '<li>"<span class="key">{key}</span>": {value}{comma}</li>'.format(
                        key=k, value=tree(v), comma="," if i < len(obj) - 1 else ""
                    )
                    for i, (k, v) in enumerate(obj.items())
                ),
            )
            if obj
            else "{}"
        )

        li = (
            lambda obj: "[<ul>{}</ul>]".format(  # noqa: E731
                "\n".join(
                    "<li>{value}{comma}</li>".format(
                        value=tree(item), comma="," if i < len(obj) - 1 else ""
                    )
                    for i, item in enumerate(obj)
                )
            )
            if obj
            else "[]"
        )

        leaf = lambda obj: '<span class="leaf type-{css}">{value}</span>'.format(  # noqa: E731
            css=css_class(obj, type(obj)),
            value=(
                to_bool(obj)
                if isinstance(obj, bool)
                else '"{}"'.format(obj)
                if isinstance(obj, str)
                else "null"
                if obj is None
                else obj
            ),
        )

        tree = lambda obj: (  # noqa: E731
            ul(obj)
            if isinstance(obj, dict)
            else li(obj)
            if isinstance(obj, list)
            else leaf(obj)
        )

        return tree(obj)


class JSONResponse(HttpResponse):
    def __init__(
        self,
        result,
        message,
        ssid=-1,
        object_dict=None,
        paging={},
        error="",
        status=200,
        error_code=None,
    ):
        self.result = result
        self.message = message
        self.ssid = ssid
        self.object_dict = object_dict
        self.paging = paging
        self.error = error
        self.error_code = error_code

        args = ()
        kwargs = {"content_type": "application/json", "status": status}
        super(HttpResponse, self).__init__(*args, **kwargs)
        self.content = self.dumps()

    def __str__(self):
        return self.__json__()

    def __json__(self):
        response_msg = {
            "result": self.result,
            "message": self.message,
            "paging": self.paging,
        }
        if self.ssid > -1:
            response_msg["ssid"] = self.ssid
        if self.error:
            response_msg["error"] = self.error
        if self.error_code:
            response_msg["error_code"] = self.error_code.name
        dic = {"response": response_msg}
        # if self.object_dict:
        dic["data"] = self.object_dict

        return dic

    def dumps(self):
        return json.dumps(self.__json__(), cls=DjangoJSONEncoder)

    def to_html(self):
        return JsonResponse.html_tree(json.loads(self.content))

    @staticmethod
    def failure(message, **kwargs):
        return JSONResponse(result=response_messages.FAILURE, message=message, **kwargs)

    @staticmethod
    def success(message, **kwargs):
        return JSONResponse(result=response_messages.SUCCESS, message=message, **kwargs)

    @staticmethod
    def paginate_queryset(*, queryset, page_size, page_number):
        paginator = Paginator(queryset, page_size)
        total_count = paginator.count
        page = paginator.get_page(page_number)
        data = list(page.object_list)
        paging = {
            "total_count": total_count,
            "current_page": page.number,
            "next_page": page.next_page_number() if page.has_next() else None,
            "previous_page": page.previous_page_number()
            if page.has_previous()
            else None,
        }
        return data, paging
