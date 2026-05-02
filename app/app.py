from flask import Flask, render_template, jsonify, abort
from data import get_feed, get_post, get_label_detail, LABELERS

app = Flask(__name__)


@app.route("/")
def index():
    posts = get_feed()
    return render_template("feed.html", posts=posts, labelers=LABELERS)


_LABELER_TEMPLATES = {
    "bookwatcher": "bookwatcher_detail.html",
    "openlibrary": "openlibrary_detail.html",
    "scholarwatch": "scholarwatch_detail.html",
}


@app.route("/labeler/<labeler_id>/post/<post_id>")
def label_detail(labeler_id, post_id):
    detail = get_label_detail(labeler_id, post_id)
    if not detail:
        abort(404)
    template = _LABELER_TEMPLATES.get(labeler_id, "label_detail.html")
    return render_template(template, **detail, labelers=LABELERS)


@app.route("/api/feed")
def api_feed():
    return jsonify(get_feed())


@app.route("/api/labeler/<labeler_id>/post/<post_id>")
def api_label_detail(labeler_id, post_id):
    detail = get_label_detail(labeler_id, post_id)
    if not detail:
        abort(404)
    return jsonify(detail)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
