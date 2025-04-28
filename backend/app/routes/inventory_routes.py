from flask import Blueprint, request, jsonify
from app.models.inventory import Inventory
from app import db

inventory_bp = Blueprint('inventory', __name__, url_prefix='/api/inventory')

@inventory_bp.route('/', methods=['GET'])
def get_inventory_items():
    items = Inventory.query.all()
    return jsonify([item.to_dict() for item in items]), 200

@inventory_bp.route('/<int:item_id>', methods=['GET'])
def get_inventory_item(item_id):
    item = Inventory.query.get_or_404(item_id)
    return jsonify(item.to_dict()), 200

@inventory_bp.route('/', methods=['POST'])
def create_inventory_item():
    data = request.get_json()
    item = Inventory(
        name=data.get('name'),
        quantity=data.get('quantity'),
        description=data.get('description'),
        # Add other fields as needed
    )
    db.session.add(item)
    db.session.commit()
    return jsonify(item.to_dict()), 201

@inventory_bp.route('/<int:item_id>', methods=['PUT'])
def update_inventory_item(item_id):
    item = Inventory.query.get_or_404(item_id)
    data = request.get_json()
    item.name = data.get('name', item.name)
    item.quantity = data.get('quantity', item.quantity)
    item.description = data.get('description', item.description)
    # Update other fields as needed
    db.session.commit()
    return jsonify(item.to_dict()), 200

@inventory_bp.route('/<int:item_id>', methods=['DELETE'])
def delete_inventory_item(item_id):
    item = Inventory.query.get_or_404(item_id)
    db.session.delete(item)
    db.session.commit()
    return jsonify({'message': 'Inventory item deleted'}), 200
