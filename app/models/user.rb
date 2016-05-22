# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :text
#  password_digest :text
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  has_one :highscore
  has_secure_password
  validates :username, :presence => true, :uniqueness => true
end
